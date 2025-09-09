import { NextResponse } from "next/server";
import User from "@/models/User";
import { initMongoose } from "@/lib/mongoose/mongoose";

export async function GET(req: Request) {
  try {
    await initMongoose();

    // ✅ URL'den query param al
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("myFavoritePortfolios");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      myFavoritePortfolios: user.myFavoritePortfolios,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
