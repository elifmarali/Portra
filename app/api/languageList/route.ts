import { initMongoose } from "@/lib/mongoose/mongoose";
import LanguageList from "@/models/LanguageList";

export async function GET() {
  await initMongoose();
  try {
    const languages = await LanguageList.find({});
    return new Response(JSON.stringify({ success: true, data: languages }), {
      status: 200,
    });
  } catch (err) {
    console.error(
      "ERR [LanguageList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "Language list alınamadı" }),
      { status: 500 }
    );
  }
}
