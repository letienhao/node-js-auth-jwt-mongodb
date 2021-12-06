const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connect = require('./app/config/db.config');
const db = require('./app/models');
const router = require('./app/routers/auth.routers');
const routerUser = require('./app/routers/user.routers');
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
const env = require("dotenv").config();

connect();

//initial();
app.use('/',router)
app.use('/',routerUser)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
