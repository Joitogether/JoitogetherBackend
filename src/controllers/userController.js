import { userService } from "../services/userService.js";

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: 200,
      message: "資料獲取成功",
      data: users,
    });
  } catch (e) {
    next(e);
  }
};

const fetchUserById = async (req, res, next) => {
  try {
    const result = await userService.getUserById(req.params.uid);
    if (!result || result.length === 0) {
      return res.status(404).json({
        message: "查無此資料",
        status: 404,
      });
    }

    res.status(200).json({
      message: "資料獲取成功",
      status: 200,
      data: result,
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
      });
    }
    const result = await userService.userRegister(userData);
    res.status(201).json({
      status: 201,
      message: "資料創建成功",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userUid = req.params.uid;
    const updateData = req.body;
    UserUpdateSchema.parse(updateData);
    const result = await userService.userUpdateInfo(updateData, userUid);

    res.status(201).json({
      status: 201,
      message: "資料更新成功",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const fetchUserApplications = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await userService.getApplicationsByUserId(uid);
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

const fetchUserPosts = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const response = await userService.getUserPosts(uid);
    if (!response) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
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

const fetchUserNotifications = async (req, res, next) => {
  try {
    const uid = req.params.uid;
    let { page, pageSize } = req.query;
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 5;
    const response = await userService.getUserNotifications(
      uid,
      page,
      pageSize
    );
    if (!response) {
      return res.status(404).json({
        status: 404,
        message: "查無此資料",
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

const markUserNotifications = async (req, res, next) => {
  try {
    const unreadList = req.body.unreadList;
    const user_id = req.params.uid;
    await userService.updateUserNotifications(user_id, unreadList);

    res.status(200).json({
      message: "資料更新成功",
      status: 200,
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

const fetchUserFollowing = async (req, res, next) => {
  try {
    const { follower_id } = req.params;
    const response = await userService.getFollowingByFollowerId(follower_id);
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

export {
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
};
