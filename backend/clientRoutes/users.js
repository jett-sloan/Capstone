const express = require("express");
const authMiddleware = require("../middleware/auth");
const { hashPassword, comparePassword, generateToken } = require("../utils/hashUtils")
const User = require("../models/user");
const router = new express.Router();


router.post("/register", async function(req, res, next){
   
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

router.post("/login", async function(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne(email);
        if (!user) {
            console.log('this is user',user)
            return res.status(404).json({ error: 'Invalid email or password' });
        }
        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);
        console.log({token})
        return res.json({ token, user });

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(400).json({ error: 'Internal Server Error' });
    }
});


router.get('/' , async function(req,res){
    const users = await User.findAll()
    return res.json(users)

})


router.post("/", authMiddleware, async function(req, res, next) {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", authMiddleware, async function(req, res, next) {
    try {
        const user = await User.update(req.params.id, req.body);
        return res.json({ user });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authMiddleware, async function(req, res, next) {
    try {
        await User.delete(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (error) {
        next(error);
    }
});
router.get('/profile', authMiddleware, (req, res) => {
    const userId = req.user.id;
    
    // Fetch user profile from the database
    // Assuming you have a User model
    User.findOne(userId, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    });
});

module.exports = router;