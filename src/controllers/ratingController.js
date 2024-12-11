import { ratingService } from "../services/ratingService.js";

const fetchHostRatings = async (req, res, next) => {
  try {
    const { host_id } = req.params;
    const response = await ratingService.getRatingByHostId(host_id);
    if (!response || response.length === 0) {
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
      });
    }
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
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
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
      });
    }

    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
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
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
      });
    }

    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export { fetchHostRatings, fetchHostDetails, fetchUserDetails };
