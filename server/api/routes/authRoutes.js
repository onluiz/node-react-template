module.exports = function (app, router) {

    let mongoose = require('mongoose'),
        User = mongoose.model('User'),
        jwt = require('jsonwebtoken');

    router.post('/auth/authenticate', function(req, res) {
        let name = req.body.name;
        let password = req.body.password;

        User.findOne({name: name}, function (err, user) {
            if (err) throw err;

            if(!user) {
                return res.json({ success: false, message: 'Authentication failed. User not found.' });
            }

            if(user) {
                if(user.password != password) {
                    return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }

                let token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn : 1440 // expires in 24 hours
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        })
    });

    router.use(function(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

};