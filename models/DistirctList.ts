import mongoose, { model, models } from "mongoose";

const DistirctSchema = new mongoose.Schema({
    id:Number,
    name:String,
    city_id:Number
});

const DistirctList = models.DistirctList || model("DistirctList" , DistirctSchema, "DistirctList");

export default DistirctList;