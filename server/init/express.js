let start = function () {

    let routes = function (router, app) {
        require('../api/routes/routes')(router);
        require('../api/routes/testRoutes')(router);
        require('../api/routes/authRoutes')(app, router);
        require('../api/routes/usersRoutes')(app);
        require('../api/routes/taskRoutes')(app);
    };

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const port = process.env.PORT || 8080;
    const router = express.Router();

    const passportStrategies = require('./passportStrategies');
    passportStrategies.start();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    routes(router, app);
    app.use('/api', router);
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
    app.set('superSecret', 'littlesupersecret');
    app.listen(port);

    console.log('Magic happens on port ' + port);
};

module.exports.start = start;