import { initMongoose } from "@/lib/mongoose/mongoose";
import DistrictList from "@/models/DistrictList";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityId = searchParams.get("city_id");

  await initMongoose();
  try {
    const districts = await DistrictList.find({ city_id: cityId });
    return new Response(
      JSON.stringify({
        success: true,
        data: districts,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "ERR [DistrictList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "District list alınamadı" }),
      { status: 500 }
    );
  }
}
