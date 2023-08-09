import twilio, { Twilio } from "twilio";

export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_NUMBER,
};
let twilioClient: Twilio | null = null;
if (twilioConfig.accountSid && twilioConfig.authToken)
  twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);

export default twilioClient;
