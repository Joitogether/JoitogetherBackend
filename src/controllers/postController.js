import { postService } from "../services/postService.js";

const fetchAllPosts = async (_req, res, next) => {
  try {
    const response = await postService.getAllPosts();

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

const fetchLatestPosts = async (_req, res, next) => {
  try {
    const response = await postService.getLatestPosts();

    if (!response || response.length === 0) {
      return res.status(200).json({
        status: 200,
        message: "查無資料",
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

const fetchPopularPosts = async (_req, res, next) => {
  try {
    const response = await postService.getPopularPosts();

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

const fetchPostDetails = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);

    const response = await postService.getPost(post_id);

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

const fetchPostsByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    const response = await postService.getPostByCategory(category);

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

const addPost = async (req, res, next) => {
  try {
    const data = req.body;

    const response = await postService.createPost(data);

    res.status(201).json({
      status: 201,
      message: "資料建立成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const data = req.body;
    const response = await postService.updatePost(post_id, data);

    res.status(200).json({
      status: 200,
      message: "資料更新成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removePost = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);

    const response = await postService.deletePost(post_id);

    res.status(200).json({
      status: 200,
      message: "資料刪除成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchPostComments = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);

    const response = await postService.getPostComments(post_id);

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

const addPostComment = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);
    const data = { ...req.body, post_id };

    const response = await postService.createPostComment(data);

    res.status(201).json({
      message: "資料建立成功",
      status: 201,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removePostComment = async (req, res, next) => {
  try {
    const comment_id = parseInt(req.params.comment_id);

    const response = await postService.deletePostComment(comment_id);

    res.status(200).json({
      status: 200,
      message: "資料刪除成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchPostLikes = async (req, res, next) => {
  try {
    const post_id = parseInt(req.params.post_id);

    const response = await postService.getPostLikes(post_id);

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

const addPostLike = async (req, res, next) => {
  const post_id = parseInt(req.params.post_id);
  const uid = req.body.uid;
  const response = await postService.createPostLike(post_id, uid);
  try {
    res.status(201).json({
      status: 201,
      message: "按讚成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removePostLike = async (req, res, next) => {
  try {
    const like_id = parseInt(req.params.like_id);
    const response = await postService.deletePostLike(like_id);

    res.status(200).json({
      status: 200,
      message: "取消按讚成功",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export {
  fetchAllPosts,
  fetchLatestPosts,
  fetchPopularPosts,
  fetchPostDetails,
  fetchPostsByCategory,
  addPost,
  editPost,
  removePost,
  fetchPostComments,
  addPostComment,
  removePostComment,
  fetchPostLikes,
  addPostLike,
  removePostLike,
};
