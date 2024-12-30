import cron from "node-cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import {
  getActivitiesByTime,
  sendNotifications,
  updateActivities,
} from "../services/cronService.js";
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
