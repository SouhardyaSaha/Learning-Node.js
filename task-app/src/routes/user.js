const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();

// register User
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }


});

// login user
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        if (error.message) {
            return res.status(400).send(error.message);
        }
        res.status(400).send(error);
    }

});

// Logout User
router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();

        res.send('Logged Out..!!');
    } catch (error) {
        res.send(error);
    }

});

router.post('/users/logoutALL', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged Out of All Sessions');
    } catch (error) {
        res.send(error);
    }
})

// read User profile
router.get('/users/me', auth, async (req, res) => {

    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }

});

// Update User
router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        
        return res.status(400).send({ error: 'Invalid Requests..!!!' });
    }
    
    try {
        
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        // this next line by passes the mongoose middleware save event...so it is replaced by the upper 3 codes

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.send(req.user);
    } catch (error) {
        // validation error
        res.status(400).send(error);
    }


});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;