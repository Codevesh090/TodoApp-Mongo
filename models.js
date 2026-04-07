const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Project101_db:oIMr8Ref78GjJYuS@cluster101.kuhkx16.mongodb.net/Todo-App");

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})
const TodoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    User_Id:{type:mongoose.Types.ObjectId,required:true,ref:"users"}
})

const userModel = mongoose.model("user",UserSchema);
const todoModel = mongoose.model("todo",TodoSchema);

module.exports = {
  userModel : userModel,
  todoModel: todoModel
}