const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to  database")
})
.catch((e)=>{
    console.log(e)
});

const LogInschema=new mongoose.Schema({
      user:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
      }
})
const collect=new mongoose.model("collected",LogInschema);

module.exports=collect;