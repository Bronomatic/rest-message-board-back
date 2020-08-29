const router = require('express').Router();
const {body} = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

// # Validations
const signupValidations = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom((value, {req}) => {
      return User.findOne({email: value})
        .then(userDoc => {
          if(userDoc){
            return Promise.reject('Email in use');
          }
        })
    })
    .normalizeEmail(),
  body('password').trim().isLength({min: 5}),
  body('name').trim().not().isEmpty()
];

const statusValidations = [
  body('status').trim().not().isEmpty()
];

// # Routes
router.put('/signup', signupValidations, authController.signup);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch('/status', isAuth, statusValidations, authController.updateUserStatus);

module.exports = router;