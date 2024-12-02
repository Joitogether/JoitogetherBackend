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
    const response = await postService.createNewPost(data)
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

// 根據分類獲得posts 



export default router