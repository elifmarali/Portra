import mongoose, { models, model } from "mongoose";

const LanguageSchema = new mongoose.Schema({
  name: String,
  id: Number,
});

const LanguageList =
  models.LanguageList || model("LanguageList", LanguageSchema, "LanguageList");

export default LanguageList;
