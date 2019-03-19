const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const csrf = require('csurf');
const app = express();

let config = require('./config/config');
const indexRouter = require('./routes/index');
// let adminRouter = require('./routes/admin');

// View Engine Setup
// •••••••••••••••••••••••••••••••
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false
}))

//CSRF Token Setup
// •••••••••••••••••••••••••••••••
app.use(csrf({
  cookie: true
}));

app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken();
  next();
});

// Flash Messages
// •••••••••••••••••••••••••••••••
app.use(flash());

// Passport Middleware
// •••••••••••••••••••••••••••••••
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
// app.use('/admin', adminRouter);

// Passport Config
// •••••••••••••••••••••••••••••••
const Account = require('./models/account');

passport.use(Account.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Account.findById(id, function (err, user) {
    done(err, user);
  });
});

// Mongoose Connection
// •••••••••••••••••••••••••••••••
mongoose.Promise = global.Promise;
mongoose
  .connect(config.database.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Database is Connected to mLab');
  })
  .catch((err) => console.log(err));

mongoose.set('debug', true);

// catch 404 and forward to error handler
// •••••••••••••••••••••••••••••••
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// •••••••••••••••••••••••••••••••
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if (req.xhr) {
    res.send(err);
  } else {
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;