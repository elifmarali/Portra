import { initMongoose } from "@/lib/mongoose/mongoose";
import JobList from "@/models/JobList";

export async function GET() {
  await initMongoose();
  try {
    const jobs = await JobList.find({});
    console.log("jobs : ", jobs)
    return new Response(JSON.stringify({ success: true, data: jobs }), {
      status: 200,
    });
  } catch (err) {
    console.error(
      "ERR [JobList/GET] : ",
      err instanceof Error ? err.message : err
    );
    return new Response(
      JSON.stringify({ success: false, message: "Job list alınamadı" }),
      { status: 500 }
    );
  }
}
