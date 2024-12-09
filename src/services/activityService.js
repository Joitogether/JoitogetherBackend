import { prisma } from '../config/db.js'
import { ActivityCommentCancelSchema, ActivityGetCategorySchema } from '../validations/activitySchema.js';

// Service 層
export const activityService = {
  async getAllActivities() {
    return await prisma.activities.findMany({
      where: { status: "registrationOpen" },
      include: { 
        users: {
          select: {
            display_name: true,
            photo_url: true
          }
        },
      _count: {
        select: {
          applications: {
            where: {
              OR: [
                { status: 'registered' },
                { status: 'approved' }
              ]
            }
          }
        }
      }
      },
        orderBy: {
          created_at: 'desc'
        }
    });
  },

  async getActivityById(id) {
    const response =  await prisma.activities.findUnique({
      where: { id },
      include: {
        users: true,
        activity_comments: {
          where: { status: 'posted'},
          orderBy: { created_at: 'desc' },
          include: {
            users: {
              select: {
                display_name: true,
                photo_url: true,
                city: true,
                age: true,
                career: true,
              }
            }
          }
        }
      }
    });

    if(!response){
      return null
    }

    const users = response.users;

    const { users: _, activity_comments, ...rest } = response;
    const comments = activity_comments.map(comment => {
      const { users, ...rest } = comment;
      return { ...rest, ...users }
    })
    
    
    return { ...rest, host_info: { ...users }, comments };
  },
  
  async getActivityByCategory(category, page, pageSize) {
    ActivityGetCategorySchema.parse({category, page, pageSize})
    const skip = (page - 1) * pageSize
    const response = await prisma.activities.findMany({
      skip,
      take: pageSize,
      where: { 
        category,
        status: "registrationOpen" 
      },
      orderBy: {
        created_at: 'desc'
      }
    })
    if(response.length === 0){
      return null
    }
    return response
  },

  async createActivity(activityData) {

    const convertToISOString = (dateTimeString) => {
      return new Date(dateTimeString).toISOString();
    };

    const formattedActivityData = {
      ...activityData,
      approval_deadline: convertToISOString(activityData.approval_deadline),
      event_time: convertToISOString(activityData.event_time)
    }
    return await prisma.activities.create({
      data: formattedActivityData
    });
  },
  
  async cancelActivity(id) {
    return await prisma.activities.update({
      where: { id },
      data: { status: 'cancelled' }
    });
  },

  async cancelRegister(participant_id, activity_id) {
    return await prisma.applications.update({
      where: { activity_id_participant_id: { participant_id, activity_id } },
      data: { status: 'participant_cancelled' , comment: null}
    });
  },

  async registerActivity(activity_id,participant_id, comment) {
    return await prisma.applications.create({
      data: {
        activity_id,
        participant_id,
        comment
     }
    });
  },
  
  // 審核用資料
  async getParticipantsByActivityId(activity_id) {
    return await prisma.applications.findMany({
      where: { activity_id }
    });
  }, 
 // 活動頁面顯示用
  async getDetailedApplications(activity_id){
    const response = await prisma.applications.findMany({
      where: { activity_id },
      include: { users: true }
    });

    if(!response){
      return null
    }
    const formattedData = response.map(data => {
      const {users, ...rest} = data
      return { ...rest, participant_info: { ...users }}
    });

    return formattedData
  },

  async hasRegistered(participant_id, activity_id){
    const res = await prisma.applications.findUnique({
      where: { activity_id_participant_id: { participant_id, activity_id } }
    })
    return !!res
  },


  async verifyParticipant(application_id, status){
    return await prisma.applications.update({
      where: { application_id },
      data: {
        status
      }
    })
  },

  async setApplicationStatus(participant_id,activity_id, status, comment){
    return await prisma.applications.update({
      where: { activity_id_participant_id: { participant_id, activity_id } },
      data: {
        status,
        comment
      }
    })
  },

  async createActivityComment(activity_id, uid, user_comment) {
    return await prisma.activity_comments.create({
      data: {
        activity_id,
        uid,
        user_comment
      }
    });
  },

  async deleteActivityComment(comment_id) {
    ActivityCommentCancelSchema.parse({comment_id})
    return await prisma.activity_comments.update({
      where: { comment_id },
      data: { status: "deleted" }
    })
  }
}