import express from 'express'
import { userService } from '../services/userService.js'
import { UserCreateSchema, UserUpdateSchema } from '../validations/userSchema.js';

const router = express.Router()


// 取得所有使用者
router.get('/', async(req, res, next) => {
  try{
    const users = await userService.getAllUsers()
    res.status(200).json({
      status: 200,
      message: '資料獲取成功',
      data: users
    })
  }catch(e){
    next(e)
  }
})


// 使用者註冊
router.post('/register', async(req, res, next) => {
  try{
    const userData = req.body
    UserCreateSchema.parse(userData)
    const existingUser = await userService.getUserByEmail( userData.email)
    if (existingUser) {    
      return res.status(409).json({
        status: 409,
        message: '使用者已存在'
      })
    }
    const result = await userService.userRegister(userData)
    res.status(201).json({
      status: 201,
      message: '資料創建成功',
      data: result
    });

  }catch(error){
    next(error)
  }
})

// 依照id更新使用者資料
router.put('/update/:uid', async(req, res, next) => {
  try{
    const userUid = req.params.uid
    const updateData = req.body
    UserUpdateSchema.parse(updateData)
    const result = await userService.userUpdateInfo(updateData, userUid)

    res.status(201).json({
      status: 201,
      message: '資料更新成功',
      data: result
    });
  }catch(error){
    next(error)
  }
})

// 依照id獲取單一使用者資料
router.get('/:uid', async(req, res, next) => {
  try{
    const result = await userService.getUserById(req.params.uid)
    if(!result || result.length === 0){
      return res.status(404).json({
        message: '查無此資料',
        status: 404
      })
    }

    res.status(200).json({
      message: '資料獲取成功',
      status: 200,
      data: result
    })
  }catch(error){
    next(error)
  }
})

router.get('/applications/:uid', async(req, res ,next) => {
  try {
    const { uid } = req.params
    const response = await userService.getApplicationsByUserId(uid)
    if(!response){
      return res.status(404).json({
        message: '查無此資料',
        status: 404
      })
    }
    return res.status(200).json({
      message: '資料獲取成功',
      status: 200,
      data: response
    })    
  } catch (error) {
    next(error)
  }


})


export default router