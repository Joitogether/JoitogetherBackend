import axios from "axios";
import { activityService } from "../services/activityService.js";
import {
  ActivityCommentSchema,
  ActivityCreateSchema,
  ActivityGetCategorySchema,
} from "../validations/activitySchema.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const fetchAllActiveActivities = async (_req, res, next) => {
  try {
    const response = await activityService.getAllActivities();

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: "成功取得資料",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchActivityDetails = async (req, res, next) => {
  try {
    const activity_id = parseInt(req.params.id);

    const [activityDetail, recent_activities] = await Promise.all([
      activityService.getActivityById(activity_id),
      activityService.getRecentActivities(),
    ]);
    if (!activityDetail || activityDetail.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
      data: { ...activityDetail, recent_activities },
    });
  } catch (error) {
    next(error);
  }
};

const fetchActivitiesByCategory = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { category, page, pageSize } = req.body;
    ActivityGetCategorySchema.parse({ type, category, page, pageSize });

    const response = await activityService.getActivityByCategory(
      type,
      category,
      page,
      pageSize
    );

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }

    res.status(200).json({
      message: "成功取得資料",
      status: 200,
      data: response,
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

const searchActivities = async (req, res, next) => {
  try {
    let { keyword } = req.body;
    switch (keyword) {
      case "運動":
        keyword = "sport";
        break;
      case "美食":
        keyword = "food";
        break;
      case "旅遊":
        keyword = "travel";
        break;
      case "購物":
        keyword = "shopping";
        break;
      case "教育":
        keyword = "education";
        break;
      default:
        break;
    }

    const response = await activityService.searchActivities(keyword);

    if (response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      message: "成功取得資料",
      data: response,
    });
    // prism找資料
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
  xs;

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

export {
  fetchAllActiveActivities,
  fetchActivityDetails,
  fetchActivitiesByCategory,
  addNewActivity,
  cancelActivityRequest,
  addActivityComments,
  removeActivityComment,
  googleMapGeocode,
  googleAutocomplete,
  searchActivities,
};
