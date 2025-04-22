import mongoose, {models,model} from "mongoose";

const UserSchema = new mongoose.Schema({
    name:String,
    surname:String,
    username:String,
    email:String,
    password:String,
    role:String
});

const Users = models.Users || model("Users", UserSchema , "Users");

export default Users;