import { initMongoose } from "@/lib/mongoose/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await initMongoose();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ERR [API/USER/GetLikePortfolios] : Email bilgisine ulaşılmıyor",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("likePortfolios");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "ERR [API/USER/GetLikePortfolios] : Kullanıcı bulunamadı",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      likePortfolios: user.likePortfolios,
    });
  } catch (err) {
    console.error("ERR [API/USER/GetLikePortfolios] : ", err);
  }
}
