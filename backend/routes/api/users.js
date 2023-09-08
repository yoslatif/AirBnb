const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


const validateSignup = [
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Please provide a first name.'),
      check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Please provide a last name.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// router.post(
//     '/',
//     validateSignup,
//     async (req, res) => {
//       const { firstName, lastName, email, password, username } = req.body;
//       const hashedPassword = bcrypt.hashSync(password);
//       const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
//       const safeUser = {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         username: user.username,
//       };
  
//       await setTokenCookie(res, safeUser);
  
//       return res.json({
//         user: safeUser
//       });
//     }
//   );


router.post(
  '/',
  validateSignup,
  async (req, res) => {
      try {
          const { firstName, lastName, email, password, username } = req.body;
          const hashedPassword = bcrypt.hashSync(password);

          // Check if a user with the given email or username exists
          const emailExists = await User.findOne({ where: { email } });
          const usernameExists = await User.findOne({ where: { username } });

          if (emailExists) {
              return res.status(500).json({
                  message: "User already exists",
                  errors: {
                      email: "User with that email already exists"
                  }
              });
          }

          if (usernameExists) {
              return res.status(500).json({
                  message: "User already exists",
                  errors: {
                      username: "User with that username already exists"
                  }
              });
          }

          const user = await User.create({ firstName, lastName, email, username, hashedPassword });

          const safeUser = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
          };

          await setTokenCookie(res, safeUser);

          return res.json({
              user: safeUser
          });
      } catch (e) {
          return res.status(400).json({
              message: "Bad Request",
              errors: {
                  email: "Invalid email",
                  username: "Username is required",
                  firstName: "First Name is required",
                  lastName: "Last Name is required",
              }
          });
      }
  }
);

module.exports = router;