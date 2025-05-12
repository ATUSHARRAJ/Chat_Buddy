const mongoose = require("mongoose");

require("dotenv").config();
console.log(process.env.DATABASE_URL);

exports.dbConnect =(req,res)=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
          console.log("DB Connection Successfull");
    })
    .catch((err)=>{
          console.log("error occured");
         console.error(err);
         process.exit(1);
    })
}
