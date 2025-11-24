"server only";
import hashedPassword from "@/lib/auth/hashPassword";
import { initMongoose } from "@/lib/mongoose/mongoose";
import Users from "@/models/User";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await initMongoose();
  try {
    const cookieStore = await cookies();
    const secret = process.env.JWT_SECRET_KEY;
    const body = await req.json();

    // Daha önceden bu email ya da username ile kayıt olan kullanıcı var mı kontrolünü sağlıyoruz
    const existingUser = await Users.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Bu e-posta veya kullanıcı adı zaten kullanımda",
        }),
        {
          status: 409,
        }
      );
    }

    const hassPass = await hashedPassword(body.password);
    const newUser = await Users.create({
      ...body,
      password: hassPass,
    });

    const token = await new SignJWT({
      id:body.id,
      name: body.name,
      surname: body.surname,
      username: body.username,
      email: body.email,
      password: hassPass,
      role: body.role,
      myFavoritePortfolios: [],
      likePortfolios: [],
      dislikePortfolios: [],
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("172800s")
      .sign(new TextEncoder().encode(secret));

    //token'ı cookies'e ekleyelim
    cookieStore.set("token", token, {
      path: "/",
      maxAge: 172800,
      secure: process.env.NODE_ENV === "production", // yalnızca production ortamında secure özelliği aktif olur
      sameSite: "strict", // Çerezin yalnızca aynı site içindeki isteklerde gönderilmesini sağlar
    });

    return new Response(JSON.stringify({ success: true, data: newUser }), {
      status: 201,
    });
  } catch (err) {
    console.error(
      "Error [Auth/Register/POST] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "Error [Auth/Register/POST]" }),
      {
        status: 400,
      }
    );
  }
}
