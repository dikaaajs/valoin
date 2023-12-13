import User from "../models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async (email, purpose, userId) => {
  try {
    const token = await bcrypt.hash(userId.toString(), 8);

    await User.findByIdAndUpdate(userId, {
      verifyToken: token,
      verifyTokenExpiry: Date.now() + 3600000, // 1h
    });

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dfdeb09c71d26b",
        pass: "975cefd68c6664",
      },
    });

    const mailOptions = {
      from: "zoneandika@gmail.com",
      to: email,
      subject:
        purpose === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p>klik link ini: ${process.env.DOMAIN}/auth/${
        purpose === "VERIFY" ? "verif" : "resetpass"
      }?t=${token}&e=${email}</p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error) {
    throw new Error(error.message);
  }
};
