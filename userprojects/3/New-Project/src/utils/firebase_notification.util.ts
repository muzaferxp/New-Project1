import admin from "firebase-admin";
import { FCM_NOTIFICATION_TYPE } from "../constants/firebase-notification.constants";
import logger from "./logger.util";

admin.initializeApp({
  credential: admin.credential.cert("firebase.json"),
});

export const pushNotification = admin.messaging();

export interface IPushNotification {
  notification?: {
    title: string;
    body: string;
  };
  condition?: string;
  topic?: string;
  data?: {
    application_id?: string;
    nav_to?: string;
  };
  token: string;
}

export const generatePayloadFCM = async (
  type: string,
  applicationId: string,
  token: string
): Promise<IPushNotification> => {
  let payload: IPushNotification = {
    token,
  };
  switch (type) {
    case FCM_NOTIFICATION_TYPE.FA_RESCHEDULED:
      payload = {
        ...payload,
        notification: {
          title: FCM_NOTIFICATION_TYPE.FA_RESCHEDULED,
          body: FCM_NOTIFICATION_TYPE.FA_RESCHEDULED,
        },
        data: {
          nav_to: "dashboard",
          application_id: applicationId,
        },
      };
      return payload;
    case FCM_NOTIFICATION_TYPE.FA_TICKET_ASSIGNED:
      payload = {
        ...payload,
        notification: {
          title: FCM_NOTIFICATION_TYPE.FA_TICKET_ASSIGNED,
          body: FCM_NOTIFICATION_TYPE.FA_TICKET_ASSIGNED,
        },
        data: {
          application_id: applicationId,
          nav_to: "start_job",
        },
      };
      return payload;
    case FCM_NOTIFICATION_TYPE.SV_TICKET_ASSIGNED_FA:
      payload = {
        ...payload,
        notification: {
          title: FCM_NOTIFICATION_TYPE.SV_TICKET_ASSIGNED_FA,
          body: FCM_NOTIFICATION_TYPE.SV_TICKET_ASSIGNED_FA,
        },
        data: {
          application_id: applicationId,
          nav_to: "detail_page",
        },
      };
      return payload;
    case FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_FIELD_AGENT:
      payload = {
        ...payload,
        notification: {
          title: FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_FIELD_AGENT,
          body: FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_FIELD_AGENT,
        },
        data: {
          nav_to: "detail_page_of_ticket_in_reschedule_tab",
          application_id: applicationId,
        },
      };
      return payload;
    case FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_SYSTEM:
      payload = {
        ...payload,
        notification: {
          title: FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_SYSTEM,
          body: FCM_NOTIFICATION_TYPE.SV_TICKET_RESCHEDULE_SYSTEM,
        },
        data: {
          nav_to: "detail_screen_of_ticket_in_reschedule_tab",
          application_id: applicationId,
        },
      };
      return payload;
    default:
      break;
  }
  return payload;
};
export const sendPushNotification = async (
  type: string,
  applicationId: string,
  token: string
) => {
  if (token?.length > 0) {
    const payload: IPushNotification = await generatePayloadFCM(
      type,
      applicationId,
      token
    );
    try {
      pushNotification
        .send(payload)
        .then((response) => {
          logger.info("successfully sent push notification", String(response));
        })
        .catch((error) => {
          logger.error("Error sending push notification", String(error));
        });
    } catch (err) {
      logger.error("Error sending push notification", String(err));
    }
  }
};
