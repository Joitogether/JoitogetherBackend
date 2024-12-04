import express from 'express'
import { postService } from '../services/postService.js'


const router = express.Router()

// 獲得所有post
router.get('/', async (req, res, next) => {

})
// 新增post
router.post('/', async (req, res, next) => {
  try{
    const data = req.body
    const response = await postService.createPost(data)
    res.status(201).json({
      message: '資料創建成功',
      status: 201,
      data: response
    })
  }catch(error){
    next(error)
  }
})
// 新增post 留言
router.post('/comment/:post_id', async (req, res, next) => {
  try{
    const post_id = parseInt(req.params.post_id)
    const data = { ...req.body, post_id }
    const response = await postService.createPostComment(data)
    res.status(201).json({
      message: '資料創建成功',
      status: 201,
      data: response
    })
  }catch(error){
    next(error)
  }
})
router.get('/:post_id', async (req, res, next) => { 
  try {
    const post_id = parseInt(req.params.post_id)
    const response = await postService.getPost(post_id)
    if(!response || response.length === 0){
      return res.status(404).json({
        status: 404,
        message: '找不到該筆資料'
      })
    }
    res.status(200).json({
      message: '資料獲取成功',
      status: 200,
      data: response
    })
  } catch (error) {
    next(error)
  }
})

// 根據分類獲得posts 



export default router