const express = require("express")
const controler = require("../controler/auth.controler")
const verifySignIn = require("../middleware/verifySignup")

const router = express.Router()

router.post('/api/signup',
            [    verifySignIn.checkDuplicateUserNameOrEmail,
                verifySignIn.checkRoleExisted
            ],
                controler.signup)

router.post('/api/signin',
                    controler.signin)


 
module.exports = router