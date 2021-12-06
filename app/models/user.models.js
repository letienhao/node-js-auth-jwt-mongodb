const mongoose = require("mongoose");
const schema = mongoose.Schema
const userSchema = new schema({
    username : String,
    email : String,
    password : String,
    roles : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "role"   //dùng để sử dụng populate
    }]
})
const user = mongoose.model("users",userSchema);
module.exports = user