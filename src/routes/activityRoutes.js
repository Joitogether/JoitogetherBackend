import express from 'express'
import { prisma } from '../config/db.js'



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
  GET_SUCCESS: '取得活動資料成功',
  CREATE_SUCCESS: '活動新增成功',
  UPDATE_SUCCESS: '活動更新成功',
  CANCEL_SUCCESS: '活動取消成功',
  NOT_FOUND: '查無資料',
  VALIDATION_ERROR: '資料驗證失敗',
  SERVER_ERROR: '伺服器錯誤'
};


// Service 層
const activityService = {
  async getAllActivities() {
    return await prisma.activities.findMany({
      select: {
        approval_deadline: true,
        category: true,
        created_at: true,
        description: true,
        event_time: true,
        host_id: true,
        id: true,
        img_url: true,
        location: true,
        max_participants: true,
        min_participants: true,
        name: true,
        pay_type: true,
        price: true,
        require_approval: true,
        status: true,
        updated_at: true
      }
    });
  },

  async getActivityById(id) {
    return await prisma.activities.findUnique({
      where: { id }
    });
  },
  
  async createActivity(activityData) {
    return await prisma.activities.create({
      data: activityData
    });
  },
  
  async cancelActivity(id) {
    return await prisma.activities.update({
      where: { id },
      data: { status: 'cancelled' }
    });
  },
  
  async getParticipantById(id) {
    return await prisma.participants.findMany({
      where: { activity_id: id }
    });
  },

  async getParticipants(activity_id){
    const response = await prisma.participants.findMany({
      where: { activity_id },
      include: { users: true }
    });

    if(!response){
      return null
    }
    const formattedData = response.map(data => {
      const {users, ...rest} = data
      return { ...rest, participant_data: { ...users }}
    });

    return formattedData
  },

  async verifyParticipant(id, status){
    return await prisma.participants.update({
      where: { id },
      data: {
        status
      }
    })
  }
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
      const activityData = {
        ...req.body,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await activityService.createActivity(activityData);

      res.status(STATUS.CREATED).json({
        status: STATUS.CREATED,
        message: MESSAGE.CREATE_SUCCESS,
        data: result
      });
    } catch (error) {
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
        message: MESSAGE.CANCEL_SUCCESS,
        data: result
      });
    } catch (error) {
      next(error);
    }
});


router.get('/participants/:id', async(req, res, next) => {
  try{
    const response = await activityService.getParticipants(parseInt(req.params.id))

    if(!response){
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

router.put('/participants/:id', async(req, res, next) => {
  try{
    const { status } = req.body
    const response = await activityService.verifyParticipant(parseInt(req.params.id), status)

    res.status(STATUS.SUCCESS).json({
      message: MESSAGE.UPDATE_SUCCESS,
      status: STATUS.SUCCESS,
      data: response
    })

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

export default router