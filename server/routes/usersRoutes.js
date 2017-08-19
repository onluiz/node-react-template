module.exports = function (router) {

    router.get('/user', function(req, res) {
        res.json({ message: 'one user' });
    });

    router.get('/users', function(req, res) {
        res.json({ message: 'all user' });
    });

};