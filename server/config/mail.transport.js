import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { sendEmailUser, sendEmailPassword } = process.env;

export const transport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: sendEmailUser,
    pass: sendEmailPassword,
  },
});
