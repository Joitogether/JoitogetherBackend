import { activityService } from "../services/activityService.js";
import {
  ApplicationSchema,
  ApplicationReviewSchema,
} from "../validations/applicationSchema.js";

const createActivityRegistration = async (req, res, next) => {
  try {
    const { participant_id, comment, register_validated } = req.body;
    const activity_id = parseInt(req.params.activity_id);
    ApplicationSchema.parse({ activity_id, participant_id, comment, register_validated });

    // 判斷當前活動是否有上限的限制
    const { require_approval, max_participants, validated_registrations } = await activityService.getActivityLimit(activity_id)
    if(require_approval == 0 && validated_registrations >= max_participants){
      return res.status(400).json({
        status: 400,
        message: '報名上限已達'
      })
    }

    const response = await activityService.upsertApplication(activity_id, participant_id, comment, register_validated)

    res.status(201).json({
      message: "資料建立成功",
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
    const { status, register_validated } = req.body;
    ApplicationReviewSchema.parse({ status, application_id, register_validated });

    const response = await activityService.verifyParticipant(
      application_id,
      status,
      register_validated
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
