import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";

export async function GET(req: Request) {
  await initMongoose();

  try {
    const { searchParams } = new URL(req.url);

    const favoriteIds =
      searchParams.get("favoriteIds")?.split(",").map(Number) || [];
    const myPortfolios =
      searchParams.get("myPortfolioIds")?.split(",").map(Number) || [];

    const allFavoritePortfolios = await PortfolioList.find({
      $or: [
        {
          $and: [{ id: { $in: myPortfolios } }, { id: { $in: favoriteIds } }],
        },
        {
          $and: [{ id: { $in: favoriteIds } }, { explorePermission: true }],
        },
      ],
    });
    return new Response(
      JSON.stringify({ success: true, data: allFavoritePortfolios }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("ERR [API/FavoritePortfolioList] : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ERR [API/FavoritePortfolioList]",
      }),
      {
        status: 500,
      },
    );
  }
}
