module.exports.start = function () {

    let mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test1db', {useMongoClient: true});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('we are connected!');
    });

    let Test = require('../api/models/testSchema');
    let Task = require('../api/models/taskSchema');
    let User = require('../api/models/userSchema');

    // let test1 = new Test({name: 'Lalalele'});
    // test1.save(function (err, test1) {
    //     if (err) return console.error(err);
    //     console.log(test1);
    // })

    // let task1 = new Task({name: 'Test Task'});
    // task1.save(function (err, task1) {
    //     if (err) return console.error(err);
    //     console.log(task1);
    // })
};