import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log(
  "EMAIL USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL PASS EXISTS:",
  !!process.env.EMAIL_PASS
);

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },
  });

export const sendOTPEmail =
  async (email, otp) => {
    try {
      console.log(
        "Sending OTP to:",
        email
      );

      console.log(
        "Generated OTP:",
        otp
      );

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          "NARpay OTP Verification",

        html: `
          <div style="
            font-family: Arial;
            padding:20px;
          ">
            <h2>
              NARpay Secure OTP
            </h2>

            <h1 style="
              color:#7c3aed;
              letter-spacing:4px;
            ">
              ${otp}
            </h1>

            <p>
              This OTP will expire in 5 minutes.
            </p>
          </div>
        `,
      });

      console.log(
        "OTP EMAIL SENT SUCCESSFULLY"
      );
    } catch (error) {
      console.log(error);

      throw error;
    }
  };