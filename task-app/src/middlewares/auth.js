const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ', '');        
        const decoded = jwt.verify(token, 'thisismysecretprivatekey');
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('Authentication Error..!!');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        if(error.message) {
            return res.status(401).send(error.message);
        }
        res.status(401).send(error);
    }

}

module.exports = auth;