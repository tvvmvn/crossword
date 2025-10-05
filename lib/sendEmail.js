// Example using Nodemailer in an API Route
import nodemailer from 'nodemailer';

export default async function sendEmail() {

  // get list of subscribers from db..
  
  const to = 'tvvmvn@gmail.com';
  const subject = 'Hello from crossword local';
  const text = 'We did it!';

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    });

    console.log({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
  }
}