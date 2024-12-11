import { activityService } from "../services/activityService.js";
import {
  ApplicationSchema,
  ApplicationReviewSchema,
} from "../validations/applicationSchema.js";

const createActivityRegistration = async (req, res, next) => {
  try {
    // 取得資料
    const { participant_id, comment } = req.body;
    const activity_id = parseInt(req.params.activity_id);
    // 資料驗證
    ApplicationSchema.parse({ activity_id, participant_id, comment });

    // 確認是否已有這筆資料，有的話就修改
    const hasRegistered = await activityService.hasRegistered(
      participant_id,
      activity_id
    );
    if (hasRegistered) {
      const response = await activityService.setApplicationStatus(
        participant_id,
        activity_id,
        "registered",
        comment
      );
      return res.status(201).json({
        message: "資料創建成功",
        status: 201,
        data: response,
      });
    }
    // 沒有的話新增
    const response = await activityService.registerActivity(
      activity_id,
      participant_id,
      comment
    );
    res.status(201).json({
      message: "資料創建成功",
      status: 201,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const removeActivityRegistration = async (req, res, next) => {
  const activity_id = parseInt(req.params.activity_id);
  const { participant_id } = req.body;

  try {
    ApplicationSchema.parse({ activity_id, participant_id });
    const response = await activityService.cancelRegister(
      participant_id,
      activity_id
    );

    res.status(200).json({
      message: "資料更新成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const fetchActivityRegistrations = async (req, res, next) => {
  try {
    const activityId = parseInt(req.params.activity_id);
    const response = await activityService.getDetailedApplications(activityId);

    if (!response || response.length === 0) {
      return res.status(STATUS.NOT_FOUND).json({
        message: MESSAGE.NOT_FOUND,
        status: STATUS.NOT_FOUND,
      });
    }

    res.status(200).json({
      message: "資料獲取成功",
      status: 200,
      data: response,
    });
  } catch (e) {
    next(e);
  }
};

const approveActivityParticipant = async (req, res, next) => {
  try {
    const application_id = parseInt(req.params.application_id);
    const { status } = req.body;
    ApplicationReviewSchema.parse({ status, application_id });

    const response = await activityService.verifyParticipant(
      application_id,
      status
    );

    res.status(200).json({
      message: "審核成功",
      status: 200,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createActivityRegistration,
  removeActivityRegistration,
  fetchActivityRegistrations,
  approveActivityParticipant,
};
