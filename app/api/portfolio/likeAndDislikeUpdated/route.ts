import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await initMongoose();
    const body = await req.json();
    const { portfolioId, action, mode } = body;

    if (!portfolioId || !action || !mode) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ERR [EPI/PORTFOLIO/LikeAndDislikeUpdated] : Değerler bulunamadı.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !["like", "dislike"].includes(action) ||
      !["increment", "decrement"].includes(mode)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ERR [EPI/PORTFOLIO/LikeAndDislikeUpdated] : Değerler eşleşmedi.",
        },
        { status: 400 }
      );
    }

    const field = action === "like" ? "likes" : "dislikes";
    const value = mode === "increment" ? 1 : -1;

    const updated = await PortfolioList.findByIdAndUpdate(
      portfolioId,
      { $inc: { [field]: value } },
      { new: true }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Like/Dislike başarıyla güncellendi.",
        data: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("ERR [API/PORTFOLİO/LİKE] : ", err);
    return NextResponse.json(
      {
        success: false,
        message: "ERR [API/PORTFOLIO/LikeAndDislikeUpdated] : Sunucu hatası.",
      },
      { status: 500 }
    );
  }
}
