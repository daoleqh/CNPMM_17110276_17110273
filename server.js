var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();

// http.createServer(function(req, res) {
//     res.writeHead(200, {
//         'Content-Type':'text/html',
//         'Access-Control-Allow-Origin':'*'
//     });

//     var readStream = fs.createReadStream(__dirname + '/index.html');

//     readStream.pipe(res);
// }).listen(1337);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')
    .get(function(req, res) {
        res.send('This is the login form');
    })

    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    })

adminRouter.use(function(req, res, next) {
    console.log('Cac request');
    console.log(req.method, req.url);
    next();
});

adminRouter.get('/', function(req, res) {
    res.send('I am Admin in the dashboard!');
});

adminRouter.get('/users', function(req, res) {
    res.send('I show all the users!');
});

adminRouter.get('/posts', function(req, res) {
    res.send('I show all the posts!');
});

adminRouter.param('name', function(req, res, next, name) {
    console.log('Doing name validations on ' + name);
    req.name = name;
    next();
});

adminRouter.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.name + '!');
});

adminRouter.get('/users/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
}); 

app.use('/admin', adminRouter);

app.listen(1337);

console.log('1337 port ----> Dung port nay !');