import express from 'express'
const router = express.Router()
import { prisma } from '../config/db.js';

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
  UPDATE_SUCCESS: '使用者更新成功',
  NOT_FOUND: '查無使用者',
  VALIDATION_ERROR: '資料驗證失敗',
  SERVER_ERROR: '伺服器錯誤'
};


const userService = {
  async getUserById(uid) {
    return await prisma.users.findUnique({
      where: { uid },
      select: {
        display_name: true,
        email: true,
        email_verified: true,
        full_name: true,
        phone_number: true,
        photo_url: true,
        uid: true
      }
    });
  },


  
  async userRegister(userData) {
    return await prisma.users.create({
      data: userData
    });
  },
  
  async userUpdateInfo(userData, uid) {
    return await prisma.users.update({
      where: { uid },
      data: userData
    });
  }
}

// 使用者註冊
router.post('/register', async(req, res, next) => {
  try{
    const userData = {
      ...req.body,
      created_at: new Date()
    }
  const result = await userService.userRegister(userData)

  res.status(STATUS.CREATED).json({
    status: STATUS.CREATED,
    message: MESSAGE.CREATE_SUCCESS,
    data: result
  });
  }catch(e){
    next(e)
  }
})

// 依照id更新使用者資料
router.put('/update/:uid', async(req, res, next) => {
  try{
    const result = await userService.userUpdateInfo(req.body, req.params.uid)

    res.status(STATUS.CREATED).json({
      status: STATUS.CREATED,
      message: MESSAGE.UPDATE_SUCCESS,
      data: result
    });
  }catch(e){
    if(e.code === 'P2025'){
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND
      })
    }
    next(e)
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
  }catch(e){
    next(e)
  }
})




export default router