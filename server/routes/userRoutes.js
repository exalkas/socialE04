import express from 'express'
import {register, login, emailConfirm, forgotPass, changePass, logout, updateProfile} from '../controllers/userController.js'
import auth from '../middlewares/auth.js'
import multerMiddleware from '../config/multer-cloudinary.js'

import {body, oneOf} from 'express-validator'

const router = express.Router()

router.post('/register', 

    body('email')
    .isEmail()
    .withMessage('please provide a valid email'),

    body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('user name is mandatory')
    .isLength({min: 3})
    .withMessage('user name must be at least 3 characters'),

    register)

router.post('/login', 
    oneOf([
        body('username')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Username is mandatory')
        .isLength({min: 3})
        .withMessage('user name must be at least 3 characters'),

        body('email')
        .trim()
        .escape()
        .isEmail()
        .withMessage('please provide a valid email')

    ]),

    body('password')
    .notEmpty()
    .withMessage('password is mandatory')
    .isLength({min: 3})
    .withMessage('pass must be at least 3 characters'),

    login)
router.post('/emailconfirm', emailConfirm)
router.post('/forgotpass', forgotPass)
router.post('/changepassword', changePass)
router.get('/logout', logout)
router.post('/profile', auth, multerMiddleware.single('image'), updateProfile)

export default router