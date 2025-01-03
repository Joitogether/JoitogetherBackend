import { getActivitiesByApprovalDeadline } from "./src/services/cronService.js";
import { userService } from "./src/services/userService.js";

const result = await getActivitiesByApprovalDeadline(
  "2025-01-01T00:00:00.000Z",
  "2025-01-02T00:00:00.000Z"
);
console.log(result[0]);

const resul = await userService.addNotifications([
  {
    actor_id: "dXwejESsYxYsqLOh1LooTfVKlr43",
    user_id: "uovmuvnsMvVPR9fabeAHLtNgwfE2",
    action: "register",
    target_type: "activity",
    target_id: 1,
    message: "您報名參加的活動已遭團主取消",
    link: "/activity/detail/1",
  },
]);

console.log(resul);
