const otpStore = {};

export const generateOTP = (
  email
) => {
  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  otpStore[email] = otp;

  return otp;
};

export const verifyOTP = (
  email,
  otp
) => {
  return otpStore[email] === otp;
};

export const removeOTP = (
  email
) => {
  delete otpStore[email];
};