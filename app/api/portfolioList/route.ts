import { ICreatePortfolio } from "@/app/createPortfolio/IProps";
import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";
import { error } from "console";

export async function POST(req: Request) {
  await initMongoose();

  try {
    const body = await req.json();

    const newPortfolio = await PortfolioList.create(body); // 📌 Veri MongoDB'ye kaydedilir

    return new Response(JSON.stringify({ success: true, data: newPortfolio }), {
      status: 201,
    });
  } catch (err) {
    console.error(
      "ERR [PortfolioList/POST]:",
      err instanceof Error ? err.message : err
    );

    return new Response(
      JSON.stringify({ success: false, message: "ERR [PortfolioList/POST]" }),
      {
        status: 400,
      }
    );
  }
}

export async function GET(req: Request) {
  await initMongoose();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "[PortfolioList] : Kullanıcının email bilgisi alınamadı!",
        }),
        {
          status: 400,
        }
      );
    }

    const myPortfolioList = await PortfolioList.find({ "author.email": email });
    return new Response(
      JSON.stringify({ success: true, data: myPortfolioList }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(
      "ERR [PortfolioList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ succcess: false, message: "ERR [PortfolioList/GET]" }),
      {
        status: 500,
      }
    );
  }
}
