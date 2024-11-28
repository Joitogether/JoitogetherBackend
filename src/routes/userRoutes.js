import express from 'express'
import { userService } from '../services/userService.js'
import { UserCreateSchema, UserUpdateSchema } from '../validations/userSchema.js';
import { z } from 'zod'

const router = express.Router()
const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const MESSAGE = {
  GET_SUCCESS: '取得使用者資料成功',
  CREATE_SUCCESS: '使用者新增成功',
  CREATE_ERROR: '使用者新增失敗',
  CREATE_EXISTS: '使用者已存在',
  UPDATE_SUCCESS: '使用者更新成功',
  UPDATE_ERROR: '使用者更新失敗',
  NOT_FOUND: '查無使用者',
  VALIDATION_ERROR: '資料驗證失敗',
  SERVER_ERROR: '伺服器錯誤'
};




// 使用者註冊
router.post('/register', async(req, res, next) => {
  try{
    const userData = req.body
    UserCreateSchema.parse(userData)
    const user = await userService.getUserByEmail( userData.email)
    if(!user){    
      const result = await userService.userRegister(userData)
      res.status(STATUS.CREATED).json({
        status: STATUS.CREATED,
        message: MESSAGE.CREATE_SUCCESS,
        data: result
      });
    }
    return res.status(409).json({
      status: 409,
      message: MESSAGE.CREATE_EXISTS
    })

  }catch(error){
    if(error instanceof z.ZodError){
      return res.status(STATUS.BAD_REQUEST).json({
       status: STATUS.BAD_REQUEST,
       message: MESSAGE.VALIDATION_ERROR,
       errors: error.message
     })
    }

    if(error.code === 'P2002'){
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS.BAD_REQUEST,
        message: MESSAGE.CREATE_ERROR,
        errors: error.message
      })
    }
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

    res.status(STATUS.CREATED).json({
      status: STATUS.CREATED,
      message: MESSAGE.UPDATE_SUCCESS,
      data: result
    });
  }catch(error){
    if(error instanceof z.ZodError){
      return res.status(STATUS.BAD_REQUEST).json({
        status: STATUS.BAD_REQUEST,
        message: MESSAGE.VALIDATION_ERROR,
        errors: error.message
      })
    }
    if(error.code === 'P2025'){
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND
      })
    }


    next(error)
  }
})

// 依照id獲取單一使用者資料
router.get('/:uid', async(req, res, next) => {
  try{
    const result = await userService.getUserById(req.params.uid)
    if(!result || result.length === 0){
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND
      })
    }

    res.status(STATUS.SUCCESS).json({
      message: MESSAGE.GET_SUCCESS,
      status: STATUS.SUCCESS,
      data: result
    })
  }catch(error){
    next(error)
  }
})




export default router