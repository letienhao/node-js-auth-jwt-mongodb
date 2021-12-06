const mongoose = require('mongoose');
const db = {};
db.mongoose = mongoose;
db.user  = require('./user.models');
db.role = require('./role.models');
db.ROLES = ["user","admin","manager"]
module.exports = db;