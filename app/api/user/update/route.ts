import { initMongoose } from "@/lib/mongoose/mongoose";
import Users from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await initMongoose();
    const body = await req.json();
    const { email, field, value } = body;

    if (!email || !field) {
      return NextResponse.json(
        { success: false, message: "Eksik parametre", received: body },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    user[field] = value;
    await user.save();

    return NextResponse.json({
      success: true,
      updatedField: field,
      value: user[field],
    });
  } catch (err) {
    console.error("Error [User/Update] :", err);
    return NextResponse.json(
      { success: false, message: "Error [User/Update]", error: err },
      { status: 400 }
    );
  }
}
