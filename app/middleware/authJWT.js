const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const db = require('../models');
const User = db.user
const Role = db.role

const verifyToken = (req,res,next)=>{
     // ta lấy token nhập vào từ headers 
     const token = req.headers['x-access-token'];
     if(!token) {
         res.status(403).send({
             message : "no token provide"
         })
     }
     jwt.verify(token,process.env.secret_key,(err,decode)=>{
         if(err){
             res.status(400).send({
                 message: err
             });
         }
         req.UserId = decode.id
         next()
     })
}
const isadmin = (req,res,next)=>{
          User.findById(req.UserId)
          .exec((err,user)=>{
              if(err){
                  res.status(400).send({message :err})
                  return
              }
         
          Role.find({
              _id : {$in : user.roles}
          },(err,roles)=>{
            if(err){
                res.status(400).send({message :err})
                return
            }
            for(let i=0;i<=roles.length;i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(400).send({
                message : "require admin role"
            })
            return;
          })
        })
        
}
const ismanager = (req,res,next)=>{
    User.findById(req.UserId)
    .exec((err,admin)=>{
        if(err){
            res.status(400).send({message : err})
            return;
        }
        Role.find({
            _id : {$in:admin.roles}
        },(err,roles)=>{
            if(err){
                res.status(400).send({message : err})
                return;
            }
            for(let i=0;i<=roles.length;i++){
                console.log("fafdsaf",roles.length)
                if(roles[i].name === "manager"){
                    next();
                    return;
                }
            }
            res.status(400).send({
                message :  "require admin role"
            })
            return;
        })
    })
}
const authJwt = {
    verifyToken,
    isadmin,
    ismanager
}
module.exports = authJwt