import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.load();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export default transporter;
