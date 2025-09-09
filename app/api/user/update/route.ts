import { initMongoose } from "@/lib/mongoose/mongoose";
import Users from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await initMongoose();

  try {
    const body = await req.json();
    const { email, field, value } = body;

    if (!email || !field) {
      return NextResponse.json({ success: false, message: "Eksik parametre" }, { status: 400 });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    // Dinamik olarak alanı güncelle
    (user as any)[field] = value;

    await user.save();

    return NextResponse.json({ success: true, updatedField: field, value: (user as any)[field] });
  } catch (err) {
    console.error("Error [User/Update] :", err);
    return NextResponse.json({ success: false, message: "Error [User/Update]" }, { status: 400 });
  }
}
