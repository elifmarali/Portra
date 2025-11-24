import { initMongoose } from "@/lib/mongoose/mongoose";

export async function GET(req: Request) {
  await initMongoose();

  try {
/*     const myFavoritePortfolios =  */
  } catch (err) {
    console.error("ERR [API/FavoritePortfolioList] : ", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "ERR [API/FavoritePortfolioList]",
      }),
      {
        status: 500,
      }
    );
  }
}
