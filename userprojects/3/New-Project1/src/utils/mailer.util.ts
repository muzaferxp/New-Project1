import nodemailer from "nodemailer";
// import logger from "./logger.util";

export const sendMail = (
  to: string,
  subject: string,
  context: any,
  html?: string,
  filename?: string,
  attachMentBuffer?: any
) => {
  if (process.env.EMAIL_ENABLED == "TRUE" && to && context) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });
    let mailOptions = {
      to: to,
      from: process.env.EMAIL_ID,
      subject: subject,
      text: context,
      ...(html ? { html } : {}),
      ...(attachMentBuffer && filename
        ? {
            attachments: [
              {
                filename,
                content: attachMentBuffer,
                contentType:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              },
            ],
          }
        : {}),
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error in sending email", error);
        // logger.error("Error in sending email", JSON.stringify(error));
      }
      transporter.close();
    });
  }
};
