module.exports = function (app) {

    let userController = require('../service/user');

    app.route('/users')
        .get(userController.listAll)
        .post(userController.create);


    app.route('/users/:userId')
        .get(userController.findById)
        .put(userController.update)
        .delete(userController.delete);
};