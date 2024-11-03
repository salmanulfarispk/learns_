import express from "express"
import mongoose from "mongoose";
import User from "./model/userModel.js"
import bcrypt from "bcryptjs"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import {app,server} from "./socket/index.js"
import jwt from "jsonwebtoken";
import authUser from "./middleware/auth.js"
const port = 8000;


const MongoDb="mongodb://127.0.0.1:27017/pagination+socket-io";
main().catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MongoDb)
    console.log("Db connected");
}

 
app.use(cors({
  origin:"http://localhost:5173",
  methods: ['GET','POST'],
  credentials: true
}))

app.use(express.json())




app.post('/register', async(req, res) => {
    const {name,email,password}=req.body;
    
    const existuser=await User.findOne({email});
    if(existuser){
      return res.json({message:"already existed user"})
    }

    const salt= 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser= new User({ 
      name,email,password:hashedPassword
    })

     await newUser.save()

    return res.json({
      success:true,
      message:"new user created!",
    })
}); 

app.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email})
  if (!user) {
    return res.json({
      success: false,
      message: "user doesn't exists...",
    });
  }
  
  const isMatchPass= await bcrypt.compare(password,user.password)
  if (isMatchPass) {
    const token= jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'2d'})
    return res.json({
      success: true,
      user,
      token
    });
  } else {
    return res.json({
      success: false,
      message: "invalid password....",
    });
  }
  
})


app.get("/allusers",authUser,async(req,res)=>{
  
  const limit = 10; 
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit; //if page is 2 then it 2-1=1 * 10 ,means it skips 10 items and starts from 11-20

  try {
  
     const totalUsers=await User.countDocuments();
      
     const Alluser = await User.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

  

    return res.json({
        success: true,
        Alluser,
        totalPages:Math.ceil(totalUsers / limit),
        currentPage:page,
        totalUsers
    });

} catch (error) {
    console.error(error);
    return res.status(500).json({        
        success: false, 
        message: "Internal server error",
    });
}
})





server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});