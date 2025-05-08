import mongoose, {models,model} from "mongoose";

const JobsSchema = new mongoose.Schema({
    id:Number,
    name: String
});

const JobList = models.JobList || model("JobList", JobsSchema, "JobList");

export default JobList;