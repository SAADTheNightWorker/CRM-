const nodemailer = require("nodemailer");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config();

const supportEmail = "saadsahib399@gmail.com";
function sendUserCredentials(
  email,
  name,
  password,
  call,
  approvedBy = "None",
  req,
  res
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let mailOptions;

    if (call === "create") {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Your Account Credentials",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>Your account has been successfully created. Below are your login details:</p>
          <p><strong>Username:</strong> ${name}<br>
             <strong>Password:</strong> ${password}</p>
          <p>Please use these credentials to log in to the system.</p>
          <p>If you have any questions or concerns, please contact your administrator.</p>
          <p>Best regards,<br>Admin Team</p>
        `,
      };
    } else if (call === "approval") {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Expense Approval Request",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>An expense has been raised for approval with the following details:</p>
          <ul>
            <li><strong>Service Description:</strong> ${
              password.serviceDec
            }</li>
            <li><strong>Amount:</strong> ${password.amount} ${
          password.currency
        }</li>
            <li><strong>Due Date:</strong>${new Date(
              password.dueDate
            ).toLocaleString()}</li>
            <li><strong>Date of Payment:</strong>${new Date(
              password.dateOfPayment
            ).toLocaleString()}</li>
            <li><strong>Duration:</strong> ${password.duration}</li>
            <li><strong>VAT:</strong> ${password.vat}</li>
            <li><strong>Created At:</strong>${new Date(
              password.CreatedAt
            ).toLocaleString()}</li>
          </ul>
          <p>Please review and take the necessary action.</p>
          <p>Best regards,<br>Admin Team</p>
        `,
      };
    } else if (call === "approval pending") {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Expense Approved By",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>An expense has been approved by ${approvedBy} with the following details:</p>
          <ul>
            <li><strong>Service Description:</strong> ${
              password.serviceDec
            }</li>
            <li><strong>Amount:</strong> ${password.amount} ${
          password.currency
        }</li>
            <li><strong>Due Date:</strong>${new Date(
              password.dueDate
            ).toLocaleString()}</li>
            <li><strong>Date of Payment:</strong>${new Date(
              password.dateOfPayment
            ).toLocaleString()}</li>
            <li><strong>Duration:</strong> ${password.duration}</li>
            <li><strong>VAT:</strong> ${password.vat}</li>
            <li><strong>Created At:</strong>${new Date(
              password.CreatedAt
            ).toLocaleString()}</li>
          </ul>
          <p>Please review and take the necessary action.</p>
          <p>Best regards,<br>Admin Team</p>
        `,
      };
    } else if (call === "Policy Expiry Reminder") {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Policy Expiry Reminder",
        html: ` 
        <body style="margin:0;padding:0;background-color:#f5f7fb;font-family:Arial, Helvetica, sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Reminder: your policy expires on ${password}. Please review to avoid interruptions.
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
         style="background:#f5f7fb;padding:24px 12px;">
    <tr>
      <td align="center">

        <!-- Main container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
               style="width:600px;max-width:100%;background:#ffffff;border-radius:14px;overflow:hidden;
                      box-shadow:0 6px 24px rgba(20,30,50,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:18px 22px;background:linear-gradient(135deg,#0b5cff,#2bd4a3);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="color:#ffffff;font-size:15px;font-weight:700;letter-spacing:0.2px;">
                    ClaimWolf Group
                  </td>
                  <td align="right" style="color:#eafff8;font-size:12px;">
                    Policy Notification
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:22px 22px 10px;color:#111827;">
              <div style="display:inline-block;background:#eef2ff;color:#3730a3;
                          font-size:11px;font-weight:700;padding:6px 10px;border-radius:999px;">
                ACTION REQUIRED
              </div>

              <h1 style="margin:12px 0 8px;font-size:20px;line-height:1.3;">
                Your policy expires soon
              </h1>

              <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#334155;">
                Dear <strong style="color:#0f172a;">${name}</strong>,
              </p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#334155;">
                This is a reminder that your policy is scheduled to expire on the date below.
                Please review and take any necessary action to avoid interruption.
              </p>

              <!-- Expiry card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                     style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;">
                <tr>
                  <td style="padding:16px;">
                    <div style="font-size:12px;color:#64748b;margin-bottom:6px;">
                      Expiry Date
                    </div>
                    <div style="font-size:18px;font-weight:800;color:#0f172a;">
                      ${password}
                    </div>

                    <div style="margin-top:10px;font-size:12px;color:#64748b;">
                      If you believe this is incorrect, reply to this email and we’ll help.
                    </div>
                  </td>
                </tr>
              </table>

          
              <div style="margin-top:16px;padding:14px;border-radius:12px;border:1px dashed #cbd5e1;">
                <div style="font-size:13px;color:#334155;line-height:1.6;">
                  <strong style="color:#0f172a;">Need assistance?</strong><br/>
                  Reply to this email or contact:
                  <a href="mailto:${supportEmail}" style="color:#0b5cff;text-decoration:none;font-weight:700;">
                    ${supportEmail}
                  </a>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 22px;background:#f8fafc;color:#64748b;font-size:11px;line-height:1.6;">
              <div style="margin-bottom:6px;">
                This is an automated notification related to your policy status.
              </div>
              <div>
                © ${new Date().getFullYear()} ClaimWolf Group. All rights reserved.
              </div>
            </td>
          </tr>

        </table>

        <div style="height:14px;"></div>

        <!-- Small compliance line (helps trust) -->
        <div style="font-size:11px;color:#94a3b8;text-align:center;">
          ClaimWolf Group
        </div>

      </td>
    </tr>
  </table>
</body>`,
      };
    } else if (call === "fleetApproval") {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Fleet Record Approved By",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>A Fleet Record has been raised for approval with the following details:</p>
          <ul>
            <li><strong>City:</strong> ${password.city}</li>
            <li><strong>Manufacture:</strong> ${password.manufacture}</li>
            <li><strong>Maker:</strong> ${password.maker}</li>
            <li><strong>Created At:</strong> ${moment(password.created_at)
              .tz("Asia/Karachi")
              .format("YYYY-MM-DD HH:mm:ss")}</li>
          </ul>
          <p>Please review and take the necessary action.</p>
          <p>Best regards,<br>Admin Team</p>
        `,
      };
    } else {
      mailOptions = {
        from: "info.finance_tracker_crm@claimwolfgroup.com",
        to: email,
        subject: "Your Account Credentials",
        html: `
          <p>Dear <strong>${name}</strong>,</p>
          <p>Your password has been successfully reset. Below are your updated login details:</p>
          <p><strong>Username:</strong> ${name}<br>
             <strong>Password:</strong> ${password}</p>
          <p>Please use this password to log in to the system.</p>
          <p>If you encounter any issues, please contact your administrator.</p>
          <p>Best regards,<br>Admin Team</p>
        `,
      };
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        logger.error(`Error sending email: ${err}`);
        if (!res.headersSent)
          return res
            .status(500)
            .send(RESPONSE(false, "Error sending email", err));
      } else {
        logger.info(`Email sent successfully: ${data.response}`);
        if (!res.headersSent)
          return res
            .status(200)
            .send(RESPONSE(true, "Email sent successfully", {}));
      }
    });
  } catch (err) {
    logger.error(`Catch Error (Email Error): ${err}`);
    if (!res.headersSent)
      return res
        .status(500)
        .send(RESPONSE(false, "Unexpected error while sending email", err));
  }
}

module.exports = sendUserCredentials;
