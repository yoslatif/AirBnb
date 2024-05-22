const express = require('express');
const { User } = require('../../db/models');
const { validateLogin, analyzeErrors } = require('../api/validators');
const { setTokenCookie, requireAuthentication } = require('../../utils/auth');
const router = express.Router();

// Log in
router.post('/', validateLogin, async (req, res) => {
    analyzeErrors(req, res, async () => {
        const { credential, password } = req.body;
        const user = await User.login({ credential, password });

        if (!user) {
            return res.status(401).json({
                message: "The provided credentials were invalid",
                statusCode: 401
            });
        }

        // Setting session info
        req.session.userId = user.id; // Store user ID in session
        setTokenCookie(res, user); // Set CSRF token cookie

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
    res.clearCookie('token'); // Clear the CSRF token cookie
    res.json({ message: 'Logged out successfully' });
});

// Restore session user
router.get('/', async (req, res) => {
    if (req.session.userId) {
        const user = await User.findByPk(req.session.userId);
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
    } else {
        res.json({ user: null });
    }
});

module.exports = router;
