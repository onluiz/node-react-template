exports.auth = function (req, res) {
    var secret = require('../../config/passport-secret').secret,
        jwt = require('jsonwebtoken'),
        User = require('../models/userSchema');

    User.findOne({name: req.body.name}, function (err, user) {
        if (err) throw err;
        if(user) {
            if(user.password === req.body.password) {
                var payload = {id: user._id};
                var token = jwt.sign(payload, secret);
                console.log(token);
                res.json({message: "ok", token: token});
            } else {
                res.status(401).json({message:"passwords did not match"});
            }
        } else {
            return res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
    })
};