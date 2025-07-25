import { initMongoose } from "@/lib/mongoose/mongoose";

export async function POST(req: Request) {
  await initMongoose();
  try {
    const body = await req.json();
    sessionStorage.removeItem(`portfolioForm-${body.formId}`);
    sessionStorage.removeItem("portfolioFormId");
    return new Response(
      JSON.stringify({
        success: true,
        data: body,
      }),
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error(
      "ERR [PortfolioList/POST] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: " ERR [PortfolioList/POST]" }),
      {
        status: 400,
      }
    );
  }
}
