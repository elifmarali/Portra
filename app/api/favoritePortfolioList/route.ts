import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";

export async function GET(req: Request) {
  await initMongoose();

  try {
    const favoritePortfolioList = await PortfolioList.find({
      explorePermission: true,
    });
    return new Response(
      JSON.stringify({ success: true, data: favoritePortfolioList }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("ERR [API/FavoritePortoflioList/GET] : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ERR [FavoritePortfolioList/GET]",
      }),
      {
        status: 500,
      }
    );
  }
}
