import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";

export async function GET() {
  await initMongoose();

  try {
    const explorePortfolios = await PortfolioList.find({
      explorePermission: true,
    });
    return new Response(JSON.stringify({ success: true, data: explorePortfolios }), {
      status: 200,
    });
  } catch (err) {
    console.error("ERR [API/ExplorePortfolioList/GET] : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ERR [ExplorePortfolioList/GET]",
      }),
      {
        status: 500,
      }
    );
  }
}
