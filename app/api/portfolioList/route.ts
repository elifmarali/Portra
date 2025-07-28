import { initMongoose } from "@/lib/mongoose/mongoose";
import PortfolioList from "@/models/PortfolioList";

export async function POST(req: Request) {
  await initMongoose();

  try {
    const body = await req.json();

    const newPortfolio = await PortfolioList.create(body); // 📌 Veri MongoDB'ye kaydedilir

    return new Response(JSON.stringify({ success: true, data: newPortfolio }), {
      status: 201,
    });

  } catch (err) {
    console.error("ERR [PortfolioList/POST]:", err instanceof Error ? err.message : err);

    return new Response(JSON.stringify({ success: false, message: "ERR [PortfolioList/POST]" }), {
      status: 400,
    });
  }
}
