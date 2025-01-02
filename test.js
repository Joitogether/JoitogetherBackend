import { getActivitiesByApprovalDeadline } from "./src/services/cronService.js";

const result = await getActivitiesByApprovalDeadline(
  "2025-01-01T00:00:00.000Z",
  "2025-01-02T00:00:00.000Z"
);
console.log(result[0]);
