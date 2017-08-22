module.exports = function (app) {

    let login = require('../service/login');

    app.route('/login')
        .post(login.auth);
};