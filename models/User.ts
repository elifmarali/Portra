import mongoose, { models, model } from "mongoose";

const UserSchema = new mongoose.Schema({
  id:Number,
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
  role: String,
  myFavoritePortfolios: { type: [String], default: [] },
});

const Users = models.Users || model("Users", UserSchema, "Users");

export default Users;
