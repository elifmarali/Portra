import mongoose, { model, models } from "mongoose";

const DistrictSchema = new mongoose.Schema({
  id: Number,
  name: String,
  city_id: Number,
});

const DistrictList =
  models.DistrictList || model("DistrictList", DistrictSchema, "DistrictList");

export default DistrictList;
