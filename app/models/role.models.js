const mongoose = require("mongoose");
const schema = mongoose.Schema
const roleSchema = new schema({
    name : String
});
const role = mongoose.model("roles",roleSchema);
module.exports = role;