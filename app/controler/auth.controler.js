// Chúng ta sẽ lần lượt tạo controller cho 2 phần: Authentication và Authorization.

// Controller cho Authentication Với phần này, chúng ta có 2 công việc chính cho tính năng authentication:

// Đăng ký: tạo người dùng mới và lưu trong cơ sở dữ liệu 
//(với role mặc định là User nếu không chỉ định trước lúc đăng ký).
// Đăng nhập: quá trình đăng nhập gồm 4 bước:
// Tìm username trong cơ sở dữ liệu,
// Nếu username tồn tại, so sánh password với password trong CSDL sử dụng. Nếu password khớp, 
//tạo token bằng jsonwebtoken rồi trả về client với thông tin User kèm access-Token Nguyên lý chỉ có như vậy
const db = require("../models");
const Role = db.role;
const User = db.user;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
exports.signup = (req,res)=>{
    const {username,email} = req.body;   
    const user = new User({
          username,
          email,
          password : bcrypt.hashSync(req.body.password,8)
       })
    user.save((err,user)=>{
        if(err){
            res.status(500).send({message: err})
        }
        if(req.body.roles){
            Role.find({
                name : {$in :req.body.roles}
            },(err,roles)=>{
                if(err){
                    res.status(400).send({message: err});
                    return;
                }
              user.roles = roles.map(role => role._id)
              user.save((err)=>{
                  if(err){
                      res.status(400).send({message :err})
                  }
                  res.status(200).send({message:"user register success"})
              })

            })
        }else{
            Role.findOne({name : "user"},(err,role)=>{
                if(err){
                    res.status(400).send({message :err})
                }
                 user.roles = [role._id]
                 user.save((err)=>{
                     if(err){
                         res.status(400).send({message:err})
                     }
                     res.status(200).send({message:"user register success"})
                 })
            })

        }
    })
  
}
exports.signin = (req,res)=>{
    const {username,password} = req.body;
    User.findOne({username},(err,user)=>{
        if(err){
            res.status(400).send({message : err})
            return;
        }
        if(!user){
            res.status(400).send({message : "user invalid"})
            return;
        }
        if(user){
            var ispassword = bcrypt.compareSync(password,user.password);
            if(!ispassword){
                res.status(500).send({
                    accesstoken : null,
                    message : "invalid password"
                })
            }
            var token = jwt.sign({id : user._id},process.env.secret_key,{
                expiresIn : 86400
            })
            res.status(200).send({
                data : user,
                accesstoken : token,
            })
        }
    })
}