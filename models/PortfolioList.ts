import mongoose, { Schema, model, models } from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    id: { type: Number },
    author: {
      id: { type: Number },
      name: { type: String, default: null },
      surname: { type: String, default: null },
      username: { type: String, default: null },
      email: { type: String, default: null },
      role: { type: String, default: null },
      myFavoritePortfolios: { type: [String], default: [] },
      likePortfolios: { type: [String], default: [] },
      dislikePortfolios: { type: [String], default: [] },
    },
    name: { type: String },
    surname: { type: String },
    title: { type: String },
    photo: {
      base64: { type: String, default: null }, // veya base64 string için: String
      name: { type: String, default: "" },
    },
    shortBiography: { type: String, default: "" },
    email: { type: String },
    jobs: { type: [Object], default: [] },
    otherJob: { type: String, default: "" },
    country: {
      id: { type: Number },
      name: { type: String },
    },
    city: {
      id: { type: Number },
      name: { type: String },
      country_id: { type: Number },
    },
    district: {
      id: { type: Number },
      name: { type: String },
      city_id: { type: Number },
    },
    skills: { type: [String], default: [] },
    languages: { type: [Object], default: [] },
    certificates: { type: [Object], default: [] },
    workExperiences: { type: [Object], default: [] },
    educations: { type: [Object], default: [] },
    projects: { type: [Object], default: [] },
    privacyPolicy: { type: Boolean, default: false },
    termOfUse: { type: Boolean, default: false },
    explorePermission: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PortfolioList =
  models.PortfolioList ||
  model("PortfolioList", PortfolioSchema, "PortfolioList");

export default PortfolioList;
