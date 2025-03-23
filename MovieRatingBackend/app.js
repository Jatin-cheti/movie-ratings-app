const express = require('express');
const routes = require("./routes/routes")
const app = express();
const path = require("path");
let config = require('./config/config.json')
const process = require('process')
let dotenv = require('dotenv').config();
 const PORT = process.env.PORT||4000
const session = require('express-session')
app.use(express.urlencoded({extended:true}));
const cors = require('cors');
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
const jwt = require('jsonwebtoken');
  
app.get("/",function(req,res){
res.send("HomePage");
})
app.use("/api/v1", routes);
app.listen(PORT,config.HOST,()=>{
    console.log(`Server started at http://localhost:${PORT}`);
})