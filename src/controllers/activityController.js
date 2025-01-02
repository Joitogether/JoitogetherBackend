import axios from "axios";
import { activityService } from "../services/activityService.js";
import {
  ActivityCommentSchema,
  ActivityCreateSchema,
  ActivityGetCategorySchema,
} from "../validations/activitySchema.js";
import { fetchSummaryFn } from "./ratingController.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;



const fetchActivityDetails = async (req, res, next) => {
  try {
    const activity_id = parseInt(req.params.id);

    const [activityDetail, recent_activities] = await Promise.all([
      activityService.getActivityById(activity_id),
      activityService.getRecentActivities(),
    ]);

    const ratings = await fetchSummaryFn(activityDetail.host_id);
    if (!activityDetail || activityDetail.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: { ...activityDetail, recent_activities, ratings },
    });
  } catch (error) {
    next(error);
  }
};

const addNewActivity = async (req, res, next) => {
  try {
    ActivityCreateSchema.parse(req.body);

    const response = await activityService.createActivity(req.body);

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const cancelActivityRequest = async (req, res, next) => {
  try {
    const activityId = parseInt(req.params.id);

    const response = await activityService.cancelActivity(activityId);

    res.status(200).json({
      status: 200,
      message: "資料刪除成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const addActivityComments = async (req, res, next) => {
  try {
    const { participant_id, comment } = req.body;
    const activity_id = parseInt(req.params.activity_id);
    ActivityCommentSchema.parse({ activity_id, participant_id, comment });

    const response = await activityService.createActivityComment(
      activity_id,
      participant_id,
      comment
    );

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removeActivityComment = async (req, res, next) => {
  try {
    const comment_id = parseInt(req.params.comment_id);

    const response = await activityService.deleteActivityComment(comment_id);

    res.status(200).json({
      message: "資料刪除成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const googleMapGeocode = async (req, res, next) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({
      status: 400,
      message: "地址為空",
      data: null,
    });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: GOOGLE_API_KEY,
        },
      }
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      res.status(201).json({
        status: 201,
        message: "取得地址成功",
        data: location,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: `地址解析失敗: ${response.data.status}`,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

const googleAutocomplete = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      status: 400,
      message: "查詢為空",
      data: null,
    });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json",
      {
        params: {
          input: query,
          key: GOOGLE_API_KEY,
          language: "zh-TW",
          components: "country:TW",
        },
      }
    );

    if (response.data.status === "OK") {
      res.status(201).json({
        status: 201,
        message: "取得成功",
        predictions: response.data.predictions,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: `地址建立失敗: ${response.data.status}`,
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};

const fetchAllActivities = async (req, res, next) => {
 try {
  const { page = 1, pageSize = 12, category, region, keyword } = req.query;
  const parsedPage = parseInt(page, 10);
  const parsedPageSize = parseInt(pageSize, 10);
  
  if(isNaN(parsedPage) || isNaN(parsedPageSize) || parsedPage < 1 || parsedPageSize < 1){
    return res.status(400).json({
      message:" 請提供有效的page 和 pageSize 參數",
      status: 400,
      data: null,
    })
  } 

  const activities = await activityService.fetchAllActivities({
    page: parsedPage,
    pageSize: parsedPageSize,
    category,
    region,
    keyword,
  });


  if(!activities || activities.length === 0){
    return res.status(200).json({
    message:"目前沒有符合條件的活動資料",
    status: 200,
    data: [],
    });
  }

  res.status(200).json({
    message: "活動資料取得成功",
    status: 200,
    data: activities,
    total: activities.length,
  });
} catch (error) {
  next(error);
}
};


export {
  fetchActivityDetails,
  addNewActivity,
  cancelActivityRequest,
  addActivityComments,
  removeActivityComment,
  googleMapGeocode,
  googleAutocomplete,
  fetchAllActivities,
};
