import { prisma } from "../config/db.js";

export async function getActivitiesByTime(start, end) {
  return await prisma.activities.findMany({
    where: {
      event_time: {
        lte: end,
        gte: start,
      },
      status: "registrationOpen",
    },
    select: {
      id: true,
      applications: {
        where: {
          register_validated: 1,
        },
        select: {
          participant_id: true,
        },
      },
    },
  });
}

export async function getActivitiesByApprovalDeadline(start, end) {
  return await prisma.activities.findMany({
    where: {
      approval_deadline: {
        lte: end,
        gte: start,
      },
      status: "registrationOpen",
    },
    select: {
      id: true,
      price: true,
      applications: {
        where: {
          register_validated: 0,
          status: "registered",
        },
        select: {
          participant_id: true,
        },
      },
    },
  });
}

export async function updateActivities(activity) {
  await prisma.activities.update({
    where: { id: activity.id },
    data: {
      status: "completed",
    },
  });
}

export async function sendNotifications(activity) {
  const notifications = activity.applications.map((application) => ({
    user_id: application.participant_id,
    actor_id: application.participant_id,
    message: "留下對活動的評價吧！",
    target_type: "activity",
    target_id: activity.id,
    link: `/activity/rating/${activity.id}`,
    action: "rate",
  }));
  return await prisma.notifications.createMany({
    data: notifications,
  });
}
