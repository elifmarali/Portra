import hashedPassword from "@/lib/auth/hashPassword";
import { initMongoose } from "@/lib/mongoose/mongoose";
import Users from "@/models/User";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await initMongoose();
  try {
    const body = await req.json();

    const hashPass = await hashedPassword(body.password);
    const existingUser = await Users.findOne({ email: body.email });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "Kullanıcı bulunamadı" }),
        {
          status: 404,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: "Şifreniz yanlıştır." }),
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET_KEY;
    const token = await new SignJWT({
      name: existingUser.name,
      surname: existingUser.surname,
      username: existingUser.username,
      email: existingUser.email,
      password: existingUser.password,
      role: existingUser.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7200s")
      .sign(new TextEncoder().encode(secret));

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      path: "/",
      maxAge: 7200,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: existingUser,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "Error [Auth/Login/POST] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "Error [Auth/Login/POST]" }),
      {
        status: 400,
      }
    );
  }
}
