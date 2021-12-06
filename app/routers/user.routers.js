const express = require("express")
const controler = require("../controler/user.controler")
const routerUser = express.Router()
const authJwt = require('../middleware/authJWT')
routerUser.get('/api/getall',controler.allAccess)
routerUser.get("/api/user",authJwt.verifyToken,controler.userBoard)
routerUser.get("/api/admin",[authJwt.verifyToken,authJwt.isadmin],controler.adminBoard)
routerUser.get("/api/manager",[authJwt.verifyToken,authJwt.ismanager],controler.moderatorBoard)
module.exports = routerUser