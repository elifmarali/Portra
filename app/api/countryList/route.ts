import { initMongoose } from "@/lib/mongoose/mongoose";
import CountryList from "@/models/CountryList";

export async function GET() {
  await initMongoose();
  try {
    const country = await CountryList.find({});
    return new Response(JSON.stringify({ success: true, data: country }), {
      status: 200,
    });
  } catch (err) {
    console.error(
      "ERR [CountryList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "CountryList alınamadı" }),
      { status: 500 }
    );
  }
}
