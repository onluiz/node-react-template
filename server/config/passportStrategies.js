let start = function (app) {
    var _ = require("lodash");
    var jwt = require('jsonwebtoken');
    var passport = require("passport");
    var passportJWT = require("passport-jwt");

    var ExtractJwt = passportJWT.ExtractJwt;
    var JwtStrategy = passportJWT.Strategy;

    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'littlesupersecret';

    var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        console.log(jwt_payload);
        let User = require('../api/models/userSchema');
        User.findById(jwt_payload.id, function(err, user) {
            if (err || !user)
                next(null, false);
            next(null, user);
        });
    });

    passport.use(strategy);
    app.use(passport.initialize());
};

module.exports.start = start;