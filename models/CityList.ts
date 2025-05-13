import mongoose, { model, models } from "mongoose";

const CitySchema = new mongoose.Schema({
  id: Number,
  name: String,
  country_id: Number,
});

const CityList= models.CityList || model("CityList", CitySchema, "CityList");

export default CityList;