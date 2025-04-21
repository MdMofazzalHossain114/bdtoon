import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/lib/email/sendEmail";
import { VerificationEmail } from "@/lib/email/VerificationEmail";
import UserModel from "@/models/user";
import { VerificationCodeModel } from "@/models/verification";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();

  try {
    const { username, firstname, lastname, email, password } =
      await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log("Verification Code generated : ", verificationCode);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already by this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUserByEmail.password = hashedPassword;
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });

      const newCode = new VerificationCodeModel({
        userId: newUser._id,
        code: verificationCode,
        expires: expiryDate,
      });

      await newUser.save();
      await newCode.save();
      console.log("Verification code created : ", newCode);
    }
    // send verification email
    const subject = "BDTOON Account Verification";
    const html = VerificationEmail({ username, verificationCode });
    /*
    const emailResponse = await sendEmail({ to: email, subject, html });

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
*/
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);

    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
