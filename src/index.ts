const express=require('express');
const routes= require("../src/routes")
const {sequelize} = require("../src/db-connection")
require("../src/db-connection")
const User=require("../src/models/userSchema")

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(routes)

sequelize.sync({alter:true, logging: false}).then(()=>{
    console.log("Syncing Complete");
}).catch((err:Error)=>{
   console.log(err);
})

app.listen(8001,()=>{
    console.log("Server is running");
})
