const express=require("express");
const path=require('path');
const collect=require("./src/mongodb")


const app=express()
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
const port= process.env.PORT||3050


app.get("/",(req,res)=>{
    res.render("login")
})
app.post("/signup",async(req,res)=>{
    const data={
        user:req.body.user,
        password:req.body.password
    }
    console.log(data)
    await collect.insertMany([data])
    res.render("home")


})
app.post("/login",async(req,res)=>{
    try{
        const check=await collect.findOne({user:req.body.name});
        if(check.password===req.body.password){
            res.render("home");
        }else{
            res.send("wrong password")
        }

    }catch{
            res.send("wrong details")
    }
   
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.listen(port,()=>{
    console.log(`Server started at ${port}`);   
})