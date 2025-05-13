import { initMongoose } from "@/lib/mongoose/mongoose";
import CityList from "@/models/CityList";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const countryId = searchParams.get("country_id");
  console.log("country id : ",countryId);
  
  await initMongoose();
  try {
    const cities = await CityList.find({ country_id: countryId });
    return new Response(JSON.stringify({ success: true, data: cities }), {
      status: 200,
    });
  } catch (err) {
    console.error(
      "ERR [CityList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "City list alınamadı" }),
      { status: 500 }
    );
  }
}
