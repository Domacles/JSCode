var path = require('path');                     // Use for Operation System file path
var crypto = require('crypto');                 // md5 and others
var express = require('express');               // express for web application
var bodyParser = require('body-parser');        // import Node.js body parsing middleware for express
var mongoose = require('mongoose');             // import mongoose
//my modules
var models = require('./models/models');        // import data models
var checkLogin = require('./checkLogin.js');    // import check for login
//exec script
var User = models.User;                         //get User and Note modules
var Note = models.Note;                         //get User and Note modules
var app = express();                            // new a express app class
// set file path for view files and use .ejs for express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set static file path
app.use(express.static(path.join(__dirname, 'public')));
//urlencoded, app use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use mongoose connect database
mongoose.connect('mongodb://localhost:27017/notes');
mongoose.connection.on('error', console.error.bind(console, 'connect database failed !'));
// app for get '/' and need route for checking login_status
app.get('/', checkLogin.login);
app.get('/reg', function(req, res) {
    res.render('register', {
        title: 'Register',
        user: req.session.user,
        page: 'reg'
    });
});

//Register
app.post('/reg', function(req, res) {
    var username = req.body.username,
        password = req.body.password,
        passwordRepeat = req.body.passwordRepeat;

    //check password
    if(password != passwordRepeat) {
        console.log('password is error !');
        return res.redirect('/reg');
    }

    //check username
    User.findOne({username:username}, function(err, user) {
        if(err) {
            console.log(err);
            return res.redirect('/reg');
        }

        if(user) {
            console.log('username has exist !');
            return res.redirect('/reg');
        }

        //password md5
        var md5 = crypto.createHash('md5'),
            md5password = md5.update(password).digest('hex');

        var newUser = new User({
            username: username,
            password: md5password
        });

        newUser.save(function(err, doc) {
            if(err) {
                console.log(err);
                return res.redirect('/reg');
            }
            console.log('Register Success !');
            newUser.password = null;
            delete newUser.password;
            req.session.user = newUser;
            return res.redirect('/');
        });
    });
});

//Login
app.get('/', checkLogin.login);
app.get('/login', function(req, res) {
    res.render('login', {
       title: 'Login',
       user: req.session.user,
       page: 'login'
    });
});

app.post('/login', function(req, res) {
    var username = req.body.username,
        password = req.body.password;

    User.findOne({username:username}, function(err, user) {
        if(err) {
            console.log(err);
            return next(err);
        }
        if(!user) {
            console.log('usename not exist !');
            return res.redirect('/login');
        }
        //password md5
        var md5 = crypto.createHash('md5'),
            md5password = md5.update(password).digest('hex');
        if(user.password !== md5password) {
            console.log('password is error !');
            return res.redirect('/login');    
        }
        console.log('Login Success !');
        user.password = null;
        delete user.password;
        req.session.user = user;
        return res.redirect('/');
    });
});

//Quit
app.get('/quit', function(req, res) {
    console.log('Quit Success !');
    return res.redirect('/login');
});

//Publish
app.get('/post', function(req, res) {
    res.render('post', {
        title: 'publish',
        user: req.session.user
    })
});

app.get('/', checkLogin.noLogin);
app.post('/post', function(req, res) {
    var note = new Note({
        title: req.body.title,
        author: req.session.user.username,
        tag: req.body.tag,
        content: req.body.content
    });

    note.save(function(err, doc) {
        if(err) {
        console.log(err);
            return res.redirect('/post');
        }
        console.log('Note Publish Success !')
        return res.redirect('/');
    });
});

// Note List
app.get('/', checkLogin.noLogin);
app.get('/', function(req, res) {
    Note.find({author: req.session.user.username})
        .exec(function(err, arts) {
            if(err) {
                console.log(err);
                return res.redirect('/');
            }
            res.render('index', {
                title: 'Note List',
                user: req.session.user,
                arts: arts,
                moment: moment
            });        
        })
});

// Note Detail
app.get('/', checkLogin.noLogin);
app.get('/detail/:_id', function(req, res) {
    Note.findOne({_id: req.params._id})
        .exec(function(err, art) {
            if(err) {
                console.log(err);
                return res.redirect('/');
            }
            if(art) {
                res.render('detail', {
                    title: 'Note Detail',
                    user: req.session.user,
                    art: art,
                    moment: moment
                });
            }
        });
});

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000');
});



/****
 * Need Test:
 * 
 * 1, session modules
 * 
 * 2, router callback how to work
 * 
 * 3, when callback of app.get('/', callback) is used
 */


