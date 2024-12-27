import { ratingService } from "../services/ratingService.js";

const fetchHostRatings = async (req, res, next) => {
  try {
    const { host_id } = req.params;

    const response = await ratingService.getRatingByHostId(host_id);

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

const fetchHostDetails = async (req, res, next) => {
  try {
    const { host_id } = req.params;
    const response = await ratingService.getRatingWithUserInfoByHostId(host_id);

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

const fetchUserDetails = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const response = await ratingService.getRatingWithUserInfoByUserId(user_id);
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

const fetchActivityAndHostRating = async (req, res, next) => {
  try {
    let { activity_id } = req.params;
    activity_id = parseInt(activity_id);
    const response = await ratingService.getRatingAndActivityByActivityId(
      activity_id
    );

    if (!response) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }

    return res.status(200).json({
      status: 200,
      message: "成功取得資料",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const createRating = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await ratingService.createRating(data);

    res.status(201).json({
      message: "資料建立成功",
      status: 201,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export {
  fetchHostRatings,
  fetchHostDetails,
  fetchUserDetails,
  fetchActivityAndHostRating,
  createRating,
};
