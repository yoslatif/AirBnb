const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup, analyzeErrors } = require('../api/validators.js');

const router = express.Router();


// POST route handler for user signup
router.post('/', validateSignup, async (req, res) => {
    // Analyzes any validation errors and proceeds with user signup if validation succeeds
    analyzeErrors(req, res, async () => {
        // Destructures necessary fields from the request body
        const { email, password, username, firstName, lastName } = req.body;
        // Signs up a new user with the given details
        const user = await User.signup({ email, username, password, firstName, lastName });
        // Sets a token cookie and sends a response with the user's safe object and token
        const token = setTokenCookie(res, user);

        return res.json({ ...user.toSafeObject(), token });
    })
});

module.exports = router;
