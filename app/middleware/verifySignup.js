const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


const checkDuplicateUserNameOrEmail = (req,res,next)=>{
    const {username,email} = req.body
    User.findOne({username})
    .exec((err,user)=>{
        if(err){
            res.status(400).send({message : err})
            return;
        }
        if(user){
            res.status(200).send({message : `name is already in use`})
            return;
        }
        User.findOne({email})
        .exec((err,mail)=>{
            if(err){
                res.status(400).send({message : err})
                return;
            }
            if(mail){
                res.status(200).send({message : `mail is already in use`})
                return;
            }
            next();
        })
       
    })
    // .then(data=>{
    //     res.status(200).send({message : `name is already in use`})
    //      User.findOne({email})
    //      .then(data=>{
    //          res.status(200).send({message : `mail  is already in use`})
    //     })
        
    // }).catch(err=>{
    //     res.status(400).send({message : err})
    //     next()
    // })
  
 
}
const checkRoleExisted = (req,res,next)=>{
   if(req.body.roles){
       for(let i=0;i< req.body.roles.length;i++){
           if(!ROLES.includes(req.body.roles[i]))
           {
            res.status(400).json({
                message : `failed role ${req.body.roles[i]} do not exist`
            });
             return;
           }
       }
   }
   next(); 
}
const verifySignIn ={
    checkDuplicateUserNameOrEmail,
    checkRoleExisted
}
module.exports = verifySignIn



