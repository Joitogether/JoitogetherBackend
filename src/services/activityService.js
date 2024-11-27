import { prisma } from '../config/db.js'

// Service 層
export const activityService = {
  async getAllActivities() {
    return await prisma.activities.findMany({
      select: {
        name: true,
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
        pay_type: true,
        price: true,
        require_approval: true,
        status: true,
        updated_at: true,}
    });
  },

  async getActivityById(id) {
    return await prisma.activities.findUnique({
      where: { id }
    });
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
      return { ...rest, participant_info: { ...users }}
    });

    return formattedData
  },

  async verifyParticipant(application_id, status){
    return await prisma.participants.update({
      where: { application_id },
      data: {
        status
      }
    })
  }
};