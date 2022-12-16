const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const Auth = require('../middleware/auth')
const { body, param, validationResult } = require('express-validator');
const { Validation } = require("../validators");

router.route('/register').post(Validation.register, controller.register)

router.route('/login').post(Validation.login, controller.login)

router.route('/profile').post(Auth.verifyToken, controller.profile)

router.route('/addcart').post(Validation.addcart, Auth.verifyToken, controller.addcart)

router.route('/checkout').post(Auth.verifyToken, controller.checkout)

router.route('/removecart').post(Validation.removecart, Auth.verifyToken, controller.removecart)

router.route('/logout').post(Auth.verifyToken, controller.logout)

module.exports = router