const express = require("express");
const { hashPassword, comparePassword, generateToken } = require("../utils/hashUtils")
const User = require("../models/user");
const router = new express.Router();


router.post("/register", async function (req, res, next) {

    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);

        const user = await User.create(firstName, lastName, email, hashedPassword);

        return res.status(201).json({ user });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/login", async function (req, res, next) {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne(email);
        if (!user) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }
        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);
        console.log('THIS IS THE USER FROM THE BACKEND', user)
        return res.json({ token, user: { email: user.email, firstname: user.firstname, lastname: user.lastname } });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(400).json({ error: 'Internal Server Error' });
    }
});




  

module.exports = router;