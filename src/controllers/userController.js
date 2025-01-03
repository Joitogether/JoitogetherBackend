import { userService } from "../services/userService.js";
import {
  UserCreateSchema,
  UserUpdateSchema,
} from "../validations/userSchema.js";
const fetchAllUsers = async (_req, res, next) => {
  try {
    const response = await userService.getAllUsers();

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

const fetchUserById = async (req, res, next) => {
  try {
    const response = await userService.getUserById(req.params.uid);

    if (!response) {
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

const registerUser = async (req, res, next) => {
  try {
    const userData = req.body;
    UserCreateSchema.parse(userData);

    const existingUser = await userService.getUserByEmail(userData.email);

    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "使用者已存在",
        data: null,
      });
    }

    const response = await userService.userRegister(userData);

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userUid = req.params.uid;
    const updateData = req.body;
    UserUpdateSchema.parse(updateData);

    const response = await userService.userUpdateInfo(updateData, userUid);

    res.status(200).json({
      status: 200,
      message: "資料更新成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchUserHostActivities = async (req, res, next) => {
  try {
    const { uid } = req.params;
    
    const response = await userService.getUserHostActivitiesByUid(uid);
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
    next (error)
  }
}

const fetchUserApplications = async (req, res, next) => {
  try {
    const { uid } = req.params;

    const response = await userService.getApplicationsByUserId(uid);

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

const fetchUserPosts = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await userService.getUserPosts(uid);
    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
        data: [],
      });
    }
    return res.status(200).json({
      message: "成功取得資料",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchUserNotifications = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    let { page, pageSize, additionalSkip } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 5;
    additionalSkip = parseInt(additionalSkip) || 0;
    const response = await userService.getUserNotifications(
      uid,
      page,
      pageSize,
      additionalSkip
    );

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

const markUserNotifications = async (req, res, next) => {
  try {
    const unreadList = req.body.unreadList;
    const user_id = req.params.uid;

    const response = await userService.updateUserNotifications(
      user_id,
      unreadList
    );

    res.status(200).json({
      message: "資料更新成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchUserFollowers = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const response = await userService.getFollowersByUserId(user_id);

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

const fetchUserFollowing = async (req, res, next) => {
  try {
    const { follower_id } = req.params;

    const response = await userService.getFollowingByFollowerId(follower_id);

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

const fetchUserSummaries = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const response = await userService.getUserSummaries(uid);

    const {
      activities,
      posts,
      applications,
      followers_followers_user_idTousers,
    } = response._count;
    response._count = {
      activities: activities + applications,
      posts,
      followers: followers_followers_user_idTousers,
    };

    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const followUser = async (req, res, next) => {
  try {
    const { user_id, follower_id } = req.body;
    const response = await userService.followUser(user_id, follower_id);
    res.status(201).json({
      status: 201,
      message: "追蹤成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const unFollowUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const followId = parseInt(id);
    const response = await userService.unfollowUser(followId);
    res.status(200).json({
      status: 200,
      message: "取消追蹤成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export {
  unFollowUser,
  followUser,
  fetchAllUsers,
  fetchUserById,
  registerUser,
  updateUserInfo,
  fetchUserApplications,
  fetchUserPosts,
  fetchUserNotifications,
  markUserNotifications,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserSummaries,
  fetchUserHostActivities,
};
