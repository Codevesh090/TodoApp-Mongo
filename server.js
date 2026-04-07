const express = require("express");
const jwt = require("jsonwebtoken");
const {userType,todoType} = require("./types");
const {userModel,todoModel} = require("./models");
const {AUTH_SECRET,authmiddleware}=require("./auth");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());


app.post("/signup",async(req,res)=>{
    const{success,data} = userType.safeParse(req.body);
    if(!success){
      res.status(401).json({
        message:"inputs are incorrect"
      })
      return;
    }

    const Password = await bcrypt.hash(data.password,12);
    //hashed the password and saved in password 


    const userInfo =await userModel.create({
      email:data.email,
      password:Password
    })

    res.status(200).json({
      message:"user added successfully",
      userInfo:userInfo
    })

})


app.post("/signin",async(req,res)=>{
   const{success,data} = userType.safeParse(req.body);
    if(!success){
      res.status(401).json({
        message:"inputs are incorrect"
      })
      return;
    }

    const user = await userModel.findOne({
      email:data.email
    })
    if(!user){
       res.status(401).json({
        message:"user not found,please signup to continue"
      })
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(data.password,user.password);
    if(!isPasswordCorrect){
       res.status(401).json({
        message:"Your password is wrong,try again"
      })
      return;
    }


    const token = jwt.sign({
      userId:user._id
    },AUTH_SECRET)

    res.status(200).json({
      token:token,
      message:"token generated successfully"
    });

})

app.use(authmiddleware);
app.post("/todo",async(req,res)=>{
    const {success,data}=todoType.safeParse(req.body);
    if(!success){
      res.status(401).json({
        message:"inputs are incorrect"
      })
      return;
    }
    const todo = await todoModel.create({
      title:data.title,
      User_Id:req.userId
    })

    res.json({
      message:"todo created successfully",
      todo:todo
    })
})



app.get("/todos",async(req,res)=>{
   const allUsers = await todoModel.find({User_Id:req.userId});
    res.json({
      allUsers:allUsers
    })
})

app.delete("/deletetodo/:todoid",async(req,res)=>{
   const todoid = req.params.todoid;
   const user = await todoModel.findOneAndDelete({_id:todoid});
    res.json({
      message:"Todo is deleted",
      deletedUser : user 
    })
})

app.put("/updatetodo/:todoid",async(req,res)=>{
   const title = req.body.title; 
   const todoid = req.params.todoid;
   const user = await todoModel.findOneAndUpdate({_id:todoid},{title:title},{new:true});
    res.json({
      message:"Todo is updated",
      updatedUser : user 
    })
})

//delete,update  

app.listen(3000,()=>{
  console.log("server is running")
})