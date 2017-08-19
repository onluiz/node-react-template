let start = function () {

    let routes = function (router) {
        require('../routes/routes')(router);
        require('../routes/testRoutes')(router);
        require('../routes/usersRoutes')(router);
    };

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const port = process.env.PORT || 8080;
    const router = express.Router();

    routes(router);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', router);
    app.listen(port);

    console.log('Magic happens on port ' + port);
};

module.exports.start = start;