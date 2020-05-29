let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let exphb = require('express-handlebars');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let mongo = require('mongodb');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp', 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`connection to database established`)
    })
    .catch(err=>{
        console.log(`db error ${err.message}`);
        process.exit(-1)
    });
let db = mongoose.connection;

// include routes
let routes = require('./routes/index');
let users = require('./routes/users');

// init app
let app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphb({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

// passport init
app.use(passport.initialize());
app.use(passport.session());

// express validator not a function
// app.use(expressValidator({
//     errorFormatter: function (param, msg, value) {
//         let namespace = param.split('.')
//         , root = namespace.shift()
//         , formParam = root;

//         while (namespace.length) {
//             formParam += '[' +namespace.shift() + ']';
//         }
//         return {
//             param: formParam,
//             msg,
//             value
//         }
//     }
// }))

// connect flash
app.use(flash());

// global variables
app.use( (req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
});

// routes middleware
app.use('/', routes);
app.use('/users', users);

//set port
app.set('port', (process.env.PORT || 3000))

app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
});