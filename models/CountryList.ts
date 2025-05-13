import mongoose, { models, model } from "mongoose";

const CountrySchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const CountryList = models.CountryList || model("CountryList", CountrySchema, "CountryList");

export default CountryList;