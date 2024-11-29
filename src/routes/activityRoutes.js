import express from 'express'
import { ActivityCreateSchema, ApplicationSchema, ApplicationReviewSchema } from '../validations/activitySchema.js';
import { activityService } from '../services/activityService.js'
const router = express.Router()



// 路由處理
// 獲取所有活動
router.get('/', async (req, res, next) => {
  try {
    const results = await activityService.getAllActivities();
    
    res.status(200).json({
      status: 200,
      message: '資料獲取成功',
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
      const activity_id = parseInt(req.params.id)
      const result = await activityService.getActivityById(activity_id);
      const participants = await activityService.getParticipantsByActivityId(activity_id)
      // 沒找到東西
      if (!result || result.length === 0) {
        return res.status(404).json({
          status: 404,
          message: '查無此資料'
        });
      }

      res.status(200).json({
        status: 200,
        message: '資料獲取成功',
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

      res.status(201).json({
        status: 201,
        message: '資料創建成功',
        data: result
      });
    } catch (error) {
      next(error)
    }
});

// 取消活動
router.put('/cancel/:id',
  async (req, res, next) => {
    try {
      const result = await activityService.cancelActivity(parseInt(req.params.id));   
      res.status(200).json({
        status: 200,
        message: '資料更新成功',
        data: result
      });
    } catch (error) {
      next(error)
    }
});

// 報名活動
router.post('/applications/:activity_id', async(req, res, next) => {
  try{
    // 取得資料
    const { participant_id, comment } = req.body
    const activity_id = parseInt(req.params.activity_id)
    // 資料驗證
    ApplicationSchema.parse({ activity_id, participant_id, comment })

    // 確認是否已有這筆資料，有的話就修改
    const hasRegistered = await activityService.hasRegistered(participant_id, activity_id)
    if(hasRegistered){
      const response = await activityService.setApplicationStatus(participant_id, activity_id, 'registered', comment)
      return res.status(201).json({
        message: '資料創建成功',
        status: 201,
        data: response
      })
    }
    // 沒有的話新增
    const response = await activityService.registerActivity(activity_id, participant_id, comment)
    res.status(201).json({
      message: '資料創建成功',
      status: 201,
      data: response
    })
  }catch(error){
    next(error)
  }
})

// 使用者取消報名
router.put('/applications/:activity_id', async(req, res, next) => {
  const activity_id = parseInt(req.params.activity_id)
  const { participant_id } = req.body

  try{
    ApplicationSchema.parse({ activity_id, participant_id })
    const response = await activityService.cancelRegister(participant_id, activity_id)

    res.status(200).json({
      message: '資料更新成功',  
      status: 200,
      data: response
    })
  }catch(error){
    next(error)
  }
})

// 獲得該活動報名者資訊
router.get('/applications/:activity_id', async(req, res, next) => {
  try{
    const activityId = parseInt(req.params.activity_id)
    const response = await activityService.getDetailedApplications(activityId)
    
    if(!response || response.length === 0){
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND
      })
    }

    res.status(200).json({
      message: '資料獲取成功',
      status: 200,
      data: response
    })

  }catch(e){
    next(e)
  }
})

// 審核活動報名者
router.put('/applications/:activity_id/verify', async(req, res, next) => {
  try{
    const application_id = parseInt(req.params.activity_id)
    const {  status } = req.body
    ApplicationReviewSchema.parse({status, application_id})

    const response = await activityService.verifyParticipant(application_id, status)

    res.status(200).json({
      message: '審核成功',
      status: 200,
      data: response
    })

  }catch(error){
    next(error)
  }
})



export default router