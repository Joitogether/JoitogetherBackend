import express from "express";
import * as PostController from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Post List
router.get(
  "/",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "取得所有文章資料" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": {
      "data": [
      {
        "post_id": 107,
        "post_title": "測試文章",
        "post_content": "TEST",
        "uid": "XRS2wbAZv3NqQ56uvoSh68veitv0",
        "created_at": "2024-12-30T07:37:49.000Z",
        "updated_at": "2024-12-30T07:37:49.000Z",
        "post_category": "shopping",
        "post_status": "posted",
        "post_img": "",
        "users": {
          "display_name": "沙拉貓",
          "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
        },
        "_count": {
          "post_comments": 0,
          "post_likes": 0
        },
        "commentCount": 0,
        "likeCount": 0
}]}
      },
        description: "成功取得資料" } */
  PostController.fetchAllPosts
);
router.get(
  "/latest",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "取得最新 15 筆文章資料" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": {
      "data": [
      {
        "post_id": 107,
        "post_title": "測試文章",
        "post_content": "TEST",
        "uid": "XRS2wbAZv3NqQ56uvoSh68veitv0",
        "created_at": "2024-12-30T07:37:49.000Z",
        "updated_at": "2024-12-30T07:37:49.000Z",
        "post_category": "shopping",
        "post_status": "posted",
        "post_img": "",
        "users": {
          "display_name": "沙拉貓",
          "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
        },
        "_count": {
          "post_comments": 0,
          "post_likes": 0
        },
        "commentCount": 0,
        "likeCount": 0
}]}
      },
        description: "成功取得資料" } */
  PostController.fetchLatestPosts
);
router.get(
  "/popular",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "取得 15 天內讚數最多的文章資料" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": {
      "data": [
      {
        "post_id": 107,
        "post_title": "測試文章",
        "post_content": "TEST",
        "uid": "XRS2wbAZv3NqQ56uvoSh68veitv0",
        "created_at": "2024-12-30T07:37:49.000Z",
        "updated_at": "2024-12-30T07:37:49.000Z",
        "post_category": "shopping",
        "post_status": "posted",
        "post_img": "",
        "users": {
          "display_name": "沙拉貓",
          "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
        },
        "_count": {
          "post_comments": 0,
          "post_likes": 0
        },
        "commentCount": 0,
        "likeCount": 0
}]}
      },
        description: "成功取得資料" } */
  PostController.fetchPopularPosts
);
router.get(
  "/:post_id",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "取得單筆文章資料" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": {
      "data": [
      {
        "post_id": 107,
        "post_title": "測試文章",
        "post_content": "TEST",
        "uid": "XRS2wbAZv3NqQ56uvgjsdh68veitv0",
        "created_at": "2024-12-30T07:37:49.000Z",
        "updated_at": "2024-12-30T07:37:49.000Z",
        "post_category": "shopping",
        "post_status": "posted",
        "post_img": "",
        "users": {
          "display_name": "沙拉貓",
          "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
        },
        "_count": {
          "post_comments": 0,
          "post_likes": 0
        },
        "commentCount": 0,
        "likeCount": 0
}]}
      },
        description: "成功取得資料" } */
  PostController.fetchPostDetails
);
router.get(
  "/category/:category",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "取得分類文章資料(food, shopping, education, sports, travel, others)" */

  /* #swagger.responses[200] = { 
      schema: { 
    "status": 200,
    "message": "成功取得資料",
    "data": {
      "data": [
      {
        "post_id": 107,
        "post_title": "測試文章",
        "post_content": "TEST",
        "uid": "XRS2wbAZv3NqQ56uvgjsdh68veitv0",
        "created_at": "2024-12-30T07:37:49.000Z",
        "updated_at": "2024-12-30T07:37:49.000Z",
        "post_category": "shopping",
        "post_status": "posted",
        "post_img": "",
        "users": {
          "display_name": "沙拉貓",
          "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
        },
        "_count": {
          "post_comments": 0,
          "post_likes": 0
        },
        "commentCount": 0,
        "likeCount": 0
}]}
      },
        description: "成功取得資料" } */
  PostController.fetchPostsByCategory
);

// Post Create/Update/Delete
router.post(
  "/",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "新增文章" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '文章內容',
            required: true,
            schema: {
            "post_id": 20,
            "post_title": "測試！",
            "post_content": "測試測試測試！",
            "uid": "KcYkDTxGZPQNzNbbTdOeO8en0Ah1",
            "created_at": "2024-12-05T13:28:21.000Z",
            "updated_at": "2024-12-05T13:28:21.000Z",
            "post_category": "food",
            "post_status": "posted",
            "post_img": "https://drive.google.com/drive/u/2/home"
        }
    } */

  /* #swagger.responses[201] = {
      schema: {
    "status": 201,
    "message": "資料建立成功",
    "data": {
        "post_id": 20,
        "post_title": "測試！",
        "post_content": "測試測試測試！",
        "uid": "KcYkDTxGZPQNzNbbTdOeO8en0Ah1",
        "created_at": "2024-12-05T13:28:21.000Z",
        "updated_at": "2024-12-05T13:28:21.000Z",
        "post_category": "food",
        "post_status": "posted",
        "post_img": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/postImages%2FphpZTyjN1.jpg?alt=media&token=4ca98841-2fa7-4d83-a380-60d37c25ca0e"
    }
},
        description: "資料建立成功" } */
  authMiddleware,
  PostController.addPost
);
router.put(
  "/:post_id",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "編輯文章" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '編輯文章內容',
            required: true,
            schema: {
            "post_id": 10,
            "post_title": "test",
            "post_content": "寫專題就是一直不斷在測試",
            "uid": "KcYkDTxGZPQNzNbbTdOeO8en0Ah0",
            "post_category": "sports",
            "post_status": "onEdit",
            "post_img": ""
        }
    } */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "資料更新成功",
    "data": {
        "post_id": 10,
        "post_title": "test",
        "post_content": "寫專題就是一直不斷在測試",
        "uid": "KcYkDTxGZPQNzNbbTdOeO8en0Ah1",
        "created_at": "2024-12-05T13:05:34.000Z",
        "updated_at": "2024-12-05T13:05:34.000Z",
        "post_category": "sports",
        "post_status": "onEdit",
        "post_img": ""
      }
}}
        description: "資料更新成功" } */
  authMiddleware,
  PostController.editPost
);
router.delete(
  "/:post_id",
  /* #swagger.tags = ['Post'] */

  /* #swagger.description = "刪除文章" */

  /* #swagger.responses[200] = {
      schema: {
    "status": 200,
    "message": "資料刪除成功",
    "data": {
        "post_id": 10,
        "post_title": "test",
        "post_content": "寫專題就是一直不斷在測試",
        "uid": "KcYkDTxGZPQNzNbbTdOeO8en0Ah1",
        "created_at": "2024-12-05T13:05:34.000Z",
        "updated_at": "2024-12-05T13:05:34.000Z",
        "post_category": "sports",
        "post_status": "deleted",
        "post_img": ""
    }
}}
        description: "資料刪除成功" } */
  authMiddleware,
  PostController.removePost
);

// Post Comment
router.get(
  "/comments/:post_id",
  /* #swagger.tags = ['Post_Comment'] */

  /* #swagger.description = "取得文章留言" */

  /* #swagger.responses[200] = {
      schema: {
  "status": 200,
  "message": "成功取得資料",
  "data": [
    {
      "comment_id": 51,
      "post_id": 106,
      "comment_content": "讚啦",
      "uid": "XRS2wbAZv3NqQ42urfuSh68veitv2",
      "created_at": "2024-12-30T02:39:55.000Z",
      "comment_status": "active",
      "users": {
        "display_name": "沙拉貓",
        "photo_url": "https://firebasestorage.googleapis.com/v0/b/login-demo1-9d3cb.firebasestorage.app/o/avatars%2F1735439695053_images%20(2).jpeg?alt=media&token=347b9eb2-8af7-4381-9aea-de763f29df09"
      }
    }
  ]
},
        description: "成功取得資料" } */
  PostController.fetchPostComments
);
router.post(
  "/comment/:post_id",
  /* #swagger.tags = ['Post_Comment'] */

  /* #swagger.description = "新增文章留言" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '新增文章留言',
            required: true,
            schema: {
            "post_id": 15,
            "comment_content": "123",
            "uid": "XRS2wbAZv3NqQ42ueeSh68veitv2",
            "comment_status": "active",
            "users": {
                "display_name": "Test",
                "photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLD8SAXsCHN6t5O1lujmNXyHr9YQJ4jPF9PXp8ao7YNG4nyiA=s96-c"
            }
        }
    } */

  /* #swagger.responses[201] = { 
      schema: {
    "message": "資料建立成功",
    "status": 201,
    "data": {
        "comment_id": 59,
        "post_id": 15,
        "comment_content": "123",
        "uid": "XRS2wbAZv3NqQ42uefwSh68veitv2",
        "created_at": "2024-12-31T08:17:16.000Z",
        "comment_status": "active"
    }
},
        description: "資料建立成功" } */
  authMiddleware,
  PostController.addPostComment
);
router.delete(
  "/comment/:comment_id",
  /* #swagger.tags = ['Post_Comment'] */

  /* #swagger.description = "刪除文章留言" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "資料刪除成功",
    "data": {
        "comment_id": 5,
        "post_id": 15,
        "comment_content": "我要去打桌遊要不要來",
        "uid": "XRS2wbAZv3NqQ475uvoSh68veitv2",
        "created_at": "2024-12-07T06:31:07.000Z",
        "comment_status": "deleted"
    }
},
        description: "資料刪除成功" } */
  authMiddleware,
  PostController.removePostComment
);

// Post Like
router.get(
  "/likes/:post_id",
  /* #swagger.tags = ['Post_Like'] */

  /* #swagger.description = "取得文章點讚" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "成功取得資料",
    "data": [
        {
            "like_id": 1,
            "post_id": 15,
            "uid": "KcYkDTxGZPQNzNbbTrfeO8en0Ah1",
            "created_at": "2024-12-06T17:49:47.000Z"
        },
        {
            "like_id": 3,
            "post_id": 15,
            "uid": "XRS2wbAZv3NqQ4uvoSh68veitv2",
            "created_at": "2024-12-08T10:52:15.000Z"
        }
    ]
},
        description: "成功取得資料" } */

  PostController.fetchPostLikes
);
router.post(
  "/like/:post_id",
  /* #swagger.tags = ['Post_Like'] */

  /* #swagger.description = "新增文章點讚" */

  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: '新增文章點讚',
            required: true,
            schema: {
            "post_id": 15,
            "uid": "KcYkDTxGZPQNzNbbTdOkef8en0Ah1"
        }
        }
    } */

  /* #swagger.responses[201] = {
      schema: {
    "status": 201,
    "message": "按讚成功",
    "data": {
        "like_id": 1,
        "post_id": 15,
        "uid": "KcYkDTxGZPQNzNbbTdOkef8en0Ah1",
        "created_at": "2024-12-06T17:49:47.000Z",
        "like_status": "liked"
    }
},
        description: "按讚成功" } */
  authMiddleware,
  PostController.addPostLike
);
router.delete(
  "/like/:like_id",
  /* #swagger.tags = ['Post_Like'] */

  /* #swagger.description = "取消文章點讚" */

  /* #swagger.responses[200] = { 
      schema: {
    "status": 200,
    "message": "取消按讚成功",
    "data": {
        "like_id": 4,
        "post_id": 25,
        "uid": "XRS2wbAZv3NqQ42uvoSh68veitv2",
        "created_at": "2024-12-08T11:14:38.000Z",
        "like_status": "unlike"
    }
},
        description: "按讚成功" } */
  authMiddleware,
  PostController.removePostLike
);

export default router;
