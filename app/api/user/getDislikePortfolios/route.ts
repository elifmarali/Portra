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
            "ERR [API/USER/GetDislikePortfolios] : Email bilgisine ulaşılamıyor",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({ email }).select("dislikePortfolios");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "ERR [API/USER/GetDislikePortfolios] : Kullanıcı bulunamadı",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      dislikePortfolios: user.dislikePortfolios,
    });
  } catch (err) {
    console.error("ERR [API/USER/GetDislikePortfolios] : ", err);
  }
}
