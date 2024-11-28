import express from 'express'
import { ActivityCreateSchema, ApplicationSchema, ApplicationUpdateSchema } from '../validations/activitySchema.js';
import { activityService } from '../services/activityService.js'
import { z } from 'zod'

// 缺少validator
const router = express.Router()

const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const MESSAGE = {
  GET_SUCCESS: '取得資料成功',
  CREATE_SUCCESS: '資料新增成功',
  UPDATE_SUCCESS: '資料更新成功',
  CREATE_ERROR: '資料新增失敗',
  NOT_FOUND: '查無資料',
  VALIDATION_ERROR: '資料驗證失敗',
  SERVER_ERROR: '伺服器錯誤'
};





// 路由處理
// 獲取所有活動
router.get('/', async (req, res, next) => {
  try {
    const results = await activityService.getAllActivities();
    
    if (!results || results.length === 0) {
      return res.status(STATUS.NOT_FOUND).json({
        status: STATUS.NOT_FOUND,
        message: MESSAGE.NOT_FOUND
      });
    }

    res.status(STATUS.SUCCESS).json({
      status: STATUS.SUCCESS,
      message: MESSAGE.GET_SUCCESS,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

// 獲取單一活動
router.get('/:id', 
  async (req, res, next) => {
    try {
      const result = await activityService.getActivityById(parseInt(req.params.id));
      const participants = await activityService.getParticipantById(parseInt(req.params.id))
      // 沒找到東西
      if (!result || result.length === 0) {
        return res.status(STATUS.NOT_FOUND).json({
          status: STATUS.NOT_FOUND,
          message: MESSAGE.NOT_FOUND
        });
      }

      res.status(STATUS.SUCCESS).json({
        status: STATUS.SUCCESS,
        message: MESSAGE.GET_SUCCESS,
        data: {...result, participants}
      });
    } catch (error) {
      next(error);
    }
});



// 新增活動
router.post('/',
  async (req, res, next) => {
    try {
      ActivityCreateSchema.parse(req.body)
  
      const result = await activityService.createActivity(req.body);

      res.status(STATUS.CREATED).json({
        status: STATUS.CREATED,
        message: MESSAGE.CREATE_SUCCESS,
        data: result
      });
    } catch (error) {
      if(error instanceof z.ZodError){
        return res.status(STATUS.BAD_REQUEST).json({
         status: STATUS.BAD_REQUEST,
         message: MESSAGE.VALIDATION_ERROR,
         errors: error.errors
       })
     }

     if(error.code === "P2002"){
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGE.CREATE_ERROR,
        status: STATUS.BAD_REQUEST,
        errors: error.message
      })
    }
      next(error);
    }
});

// 取消活動
router.put('/cancel/:id',
  async (req, res, next) => {
    try {
      const result = await activityService.cancelActivity(parseInt(req.params.id));
      
      res.status(STATUS.SUCCESS).json({
        status: STATUS.SUCCESS,
        message: MESSAGE.UPDATE_SUCCESS,
        data: result
      });
    } catch (error) {
      if(error.code === 'P2025'){
        return res.status(STATUS.NOT_FOUND).json({
          message: MESSAGE.NOT_FOUND,
          status: STATUS.NOT_FOUND
        })
      }
      next(error);
    }
});

// 報名活動
router.post('/applications/:activity_id', async(req, res, next) => {
  try{
    const { participant_id } = req.body
    const activity_id = parseInt(req.params.activity_id)

    ApplicationSchema.parse({ activity_id, participant_id })
    const response = await activityService.registerActivity(activity_id, participant_id)
    res.status(STATUS.CREATED).json({
      message: MESSAGE.CREATE_SUCCESS,
      status: STATUS.CREATED,
      data: response
    })
  }catch(error){
    if(error instanceof z.ZodError){
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGE.VALIDATION_ERROR,
        status: STATUS.BAD_REQUEST,
        errors: error.errors
      })
    }
    if(error.code === "P2002"){
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGE.CREATE_ERROR,
        status: STATUS.BAD_REQUEST,
        errors: error.message
      })
    }

    next(error)
  }
})

// 獲得該活動報名者資訊
router.get('/applications/:activity_id', async(req, res, next) => {
  try{
    const activityId = parseInt(req.params.activity_id)
    const response = await activityService.getParticipants(activityId)

    if(!response || response.length === 0){
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND
      })
    }

    res.status(STATUS.SUCCESS).json({
      message: MESSAGE.GET_SUCCESS,
      status: STATUS.SUCCESS,
      data: response
    })

  }catch(e){
    next(e)
  }
})

// 審核活動報名者
router.put('/applications/:application_id', async(req, res, next) => {
  try{
    const { status } = req.body
    if(!status){
      return res.status(STATUS.BAD_REQUEST).json({
        message: MESSAGE.VALIDATION_ERROR,
        status: STATUS.BAD_REQUEST
      })
    }
    ApplicationUpdateSchema.parse(status)

    const applicationId = parseInt(req.params.application_id)
    const response = await activityService.verifyParticipant(applicationId, status)

    res.status(STATUS.SUCCESS).json({
      message: '審核成功',
      status: STATUS.SUCCESS,
      data: response
    })

  }catch(error){
    if(error instanceof z.ZodError){
      return res.status(STATUS.BAD_REQUEST).json({
       status: STATUS.BAD_REQUEST,
       message: MESSAGE.VALIDATION_ERROR,
       errors: error.errors
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


export default router