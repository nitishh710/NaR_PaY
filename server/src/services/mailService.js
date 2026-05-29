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

import nodemailer from "nodemailer";

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

host:"smtp.gmail.com",

port:465,

secure:true,

auth:{

user:
process.env.EMAIL_USER,

pass:
process.env.EMAIL_PASS,

},

connectionTimeout:10000,

greetingTimeout:10000,

socketTimeout:10000,

});

transporter.verify(
(error,success)=>{

if(error){

console.log(
"SMTP ERROR:",
error
);

}else{

console.log(
"SMTP Working"
);

}

}
);

export const sendOTPEmail =
async(email,otp)=>{

try{

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to:email,

subject:
"NARpay Password Reset OTP",

html:`

<div
style="
font-family:Arial;
padding:20px;
">

<h2>
NARpay OTP Verification
</h2>

<p>

Your OTP is:

</p>

<h1>

${otp}

</h1>

<p>

Do not share this OTP.

</p>

</div>

`

});

console.log(
"OTP SENT"
);

}catch(err){

console.log(
"MAIL ERROR:",
err
);

throw err;

}

};

export default transporter;

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