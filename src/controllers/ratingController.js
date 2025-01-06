import { activityService } from "../services/activityService.js";
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
    const [response, applications] = await Promise.all([
      ratingService.getRatingAndActivityByActivityId(activity_id),
      activityService.getParticipantsByActivityId(activity_id),
    ]);
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
      data: {
        ...response,
        applications,
      },
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

const fetchSummary = async (req, res, next) => {
  const { host_id } = req.params;
  try {
    const result = await fetchSummaryFn(host_id);

    res.status(200).json({
      message: "成功取得資料",
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const fetchSummaryFn = async (host_id) => {
  const response = await ratingService.getSummary(host_id);

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  response.forEach((item) => {
    ratingCounts[item.rating_heart] = item._count.rating_heart;
  });

  const totalRatings = Object.values(ratingCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const ratingPercentages = {};
  for (const rating in ratingCounts) {
    ratingPercentages[`heart${rating}`] = totalRatings
      ? ((ratingCounts[rating] / totalRatings) * 100).toFixed(2)
      : 0;
  }

  const averageHeart = totalRatings
    ? (
        Object.entries(ratingCounts).reduce(
          (sum, [rating, count]) => sum + parseInt(rating) * count,
          0
        ) / totalRatings
      ).toFixed(1)
    : 0;

  const heartCounts = {};
  for (const keys in ratingCounts) {
    heartCounts[`heart${keys}`] = ratingCounts[keys];
  }
  return {
    heartCounts,
    ratingPercentages,
    averageHeart: averageHeart,
  };
};
export {
  fetchHostRatings,
  fetchHostDetails,
  fetchUserDetails,
  fetchActivityAndHostRating,
  createRating,
  fetchSummary,
  fetchSummaryFn,
};
