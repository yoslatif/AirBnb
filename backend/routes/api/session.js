const express = require('express');

const { setTokenCookie, restoreUser, requireAuthentication } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { validateLogin, analyzeErrors } = require('../api/validators.js');

const router = express.Router();

// // Log in
// router.post('/', validateLogin, async (req, res, next) => {
//     analyzeErrors(req, res, async () => {
//         const { credential, password } = req.body;

//         const user = await User.login({ credential, password });

//         if (!user) {
//             return res.status(401).json({
//                 "message": "The provided credentials were invalid",
//                 "statusCode": 401
//             })
//         }

//         setTokenCookie(res, user);

//         const { id, firstName, lastName, email, username } = user;
//         return res.json({
//             user: {
//                 id, 
//                 firstName, 
//                 lastName, 
//                 email, 
//                 username
//             }
//         });
//     })
// });

// // Log out
// router.delete('/', (_req, res) => {
//     res.clearCookie('token');
//     return res.json({ message: 'success' });
// });

// // Restore session user
// router.get('/', (req, res) => {
//     if (req.user) {
//         // If there is an authenticated user, return their details
//         const userResponse = {
//             id: req.user.id,
//             firstName: req.user.firstName,
//             lastName: req.user.lastName,
//             email: req.user.email,
//             username: req.user.username
//         };
//         res.json({ user: userResponse });
//     } else {
//         // If no user is authenticated, return { user: null }
//         res.json({ user: null });
//     }
// });

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    analyzeErrors(req, res, async () => {
        const { credential, password } = req.body;
        const user = await User.login({ credential, password });

        if (!user) {
            return res.status(401).json({
                "message": "The provided credentials were invalid",
                "statusCode": 401
            });
        }

        // Setting session info
        req.session.userId = user.id; // Store user ID in session

        return res.json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            }
        });
    });
});

// Log out
router.delete('/', (req, res) => {
    req.session.destroy(); // Destroy session
    res.json({ message: 'Logged out successfully' });
});

// Restore session user
router.get('/', (req, res) => {
    if (req.session.userId) {
        User.findById(req.session.userId).then(user => {
            if (user) {
                res.json({
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        username: user.username
                    }
                });
            } else {
                res.json({ user: null });
            }
        });
    } else {
        res.json({ user: null });
    }
});



module.exports = router;
