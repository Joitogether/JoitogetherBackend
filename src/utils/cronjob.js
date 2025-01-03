import cron from "node-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import {
  getActivitiesByApprovalDeadline,
  getActivitiesByTime,
  sendNotifications,
  updateActivities,
} from "../services/cronService.js";
import paymentService from "../services/paymentService.js";
dayjs.extend(utc);
dayjs.extend(timezone);
const tz = "Asia/Taipei";

const cronJobs = {
  dailyUpdates() {
    cron.schedule(
      "0 0 * * *",
      async () => {
        try {
          const today = dayjs().tz(tz).startOf("day").toISOString();
          const yesterday = dayjs()
            .tz(tz)
            .subtract(1, "day")
            .startOf("day")
            .toISOString();
          // 找有哪些活動是昨天最後截止報名，回來的只會有狀態為已報名但沒審核通過的
          const deadLineActivities = await getActivitiesByApprovalDeadline(
            yesterday,
            today
          );
          deadLineActivities.forEach(async (activity) => {
            if (activity.length != 0) {
              await Promise.all(
                activity.applications.map(async (application) => {
                  const refund = await paymentService.addDeposit(
                    application.participant_id,
                    parseInt(activity.price)
                  );
                  const record = await paymentService.createPaymentRecord(
                    application.participant_id,
                    "refund",
                    parseInt(activity.price),
                    refund.balance
                  );
                  return { refund, record };
                })
              );
            }
          });

          const activities = await getActivitiesByTime(yesterday, today);

          if (activities.length === 0) {
            return;
          }

          // 將昨天的活動狀態改為completed
          const promises = activities
            .filter((activity) => activity.applications.length > 0)
            .map(async (activity) => {
              await updateActivities(activity);
              // 發送提醒讓參加者可以去評價
              return sendNotifications(activity);
            });

          await Promise.all(promises);
        } catch (error) {
          console.log("cronJob發生錯誤", error);
        }
      },
      {
        timezone: tz,
      }
    );
  },
};

export default cronJobs;
