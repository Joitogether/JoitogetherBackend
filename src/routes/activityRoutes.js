import express from 'express'
import { ActivityCommentSchema, ActivityCreateSchema } from '../validations/activitySchema.js';
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

router.post('/comment/:activity_id', async (req, res, next) => {
  try {
    const { participant_id, comment } = req.body
    const activity_id = parseInt(req.params.activity_id)
    // 資料驗證
    ActivityCommentSchema.parse({ activity_id, participant_id, comment })
    // 串資料庫
    const response = await activityService.createActivityComment(activity_id, participant_id, comment)
    //
    res.status(201).json({
      message: '資料創建成功',
      status: 201,
      data: response
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/comment/:comment_id', async (req, res, next) => {
  try{
    const comment_id = parseInt(req.params.comment_id)
    const response = await activityService.deleteActivityComment(comment_id)
    res.status(200).json({
      message: '資料更新成功',  
      status: 200,
      data: response
    })
  }catch(error){
    next(error)
  }
})


export default router