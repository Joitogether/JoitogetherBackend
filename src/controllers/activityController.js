import axios from "axios";
import { activityService } from "../services/activityService.js";
import {
  ActivityCommentSchema,
  ActivityCreateSchema,
  ActivityGetCategorySchema,
} from "../validations/activitySchema.js";
import { fetchSummaryFn } from "./ratingController.js";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const fetchAllActiveActivities = async (_req, res, next) => {
  try {
    const results = await activityService.getAllActivities();

    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: results,
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

    const ratings = await fetchSummaryFn(activityDetail.host_id);
    if (!activityDetail || activityDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
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
    if (!response) {
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
      });
    }
    return res.status(200).json({
      message: "資料獲取成功",
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

    const result = await activityService.createActivity(req.body);

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancelActivityRequest = async (req, res, next) => {
  try {
    const activityId = parseInt(req.params.id);
    const result = await activityService.cancelActivity(activityId);
    res.status(200).json({
      status: 200,
      message: "資料更新成功",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const fetchActivityComments = async (req, res, next) => {
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
      message: "資料建立成功",
      status: 201,
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
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
        data: [],
      });
    }
    res.status(200).json({
      message: "資料獲取成功",
      status: 200,
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
    return res.status(400).json({ error: "地址為空" });
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
      res
        .status(201)
        .json({ message: "獲取地址成功", status: "201", data: location });
    } else {
      res.status(400).json({ error: `地址解析失敗: ${response.data.status}` });
    }
  } catch (error) {
    next(error);
  }
};

const googleAutocomplete = async (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "查詢為空" });
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
        message: "獲取成功",
        status: 201,
        predictions: response.data.predictions,
      });
    } else {
      res.status(400).json({ error: `地址建議失敗: ${response.data.status}` });
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
  fetchActivityComments,
  removeActivityComment,
  googleMapGeocode,
  googleAutocomplete,
  searchActivities,
};
