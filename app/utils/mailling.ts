import * as nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import { prisma } from "../config/config";

export async function sendEmail(id: string, email: string) {
   try {
      const hashedToken = JWT.sign(
         { id: id, email: email },
         process.env.EMAIL_TOKEN_SECRET,
         { expiresIn: "1h" }
      );

      await prisma.user.update({
         where: {
            id: id,
         },
         data: {
            verifyToken: hashedToken,
         },
         select: {
            verifyToken: true,
         },
      });

      const transport = nodemailer.createTransport({
         host: process.env.MAILTRAP_HOST,
         port: process.env.MAILTRAP_PORT,
         auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD,
         },
      } as nodemailer.TransportOptions);

      const receiver = {
         from: `"FindHome.com" ${process.env.MAIL_AUTH_USER}`,
         to: email,
         subject: "Verify Your Email",
         html: `
               <p> "We just need to verify your email address before you can access GrowUp learning platform."
               </p>
               <p>
                     <a href="${process.env.DOMAIN}/verify-email?token="${hashedToken}" style="display: inline-block; background-color: #3772FF; color: white; font-family: 'Inter', sans-serif; padding: 6px 10px; text-decoration: none; border-radius: 5px; font-size: 13px; font-weight: bold;">
                        Verify Email
                     </a>
               </p> 
               
               
               <p>Thanks! – The FindHome.com team</p>
            `,
      };

      const mailResponse = await transport.sendMail(receiver);
      return mailResponse;
   } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
   }
}
