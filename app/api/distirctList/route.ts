import { initMongoose } from "@/lib/mongoose/mongoose";
import DistirctList from "@/models/DistirctList";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cityId = searchParams.get("city_id");

  await initMongoose();
  try {
    const distircts = await DistirctList.find({ city_id: cityId });
    return new Response(
      JSON.stringify({
        success: true,
        data: distircts,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(
      "ERR [DistirctList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "Distirct list alınamadı" }),
      { status: 500 }
    );
  }
}
