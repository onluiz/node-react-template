function authStrategy(jwtOptions) {
    return new JwtStrategy(jwtOptions, function (jwt_payload, next) {
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        var user = users[_.findIndex(users, {id: jwt_payload.id})];
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
}

let start = function () {
    var _ = require("lodash");
    var jwt = require('jsonwebtoken');
    var passport = require("passport");
    var passportJWT = require("passport-jwt");

    var ExtractJwt = passportJWT.ExtractJwt;
    var JwtStrategy = passportJWT.Strategy;

    var jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
    jwtOptions.secretOrKey = 'tasmanianDevil';

    var strategy = authStrategy(jwtOptions);

    passport.use(strategy);
};

module.exports.start = start;