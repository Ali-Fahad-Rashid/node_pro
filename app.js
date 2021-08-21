const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>
app.listen(3100)).catch(err=>console.log(err))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(require('body-parser').urlencoded({ extended: true }));
const passport = require('passport')
require('./routes/passport')(passport)

var cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));
const session = require('express-session');  // session middleware
app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    maxAge: 3600000 *24 *30 *12 //1 hour

  }));

const flash = require('express-flash')
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());


  app.get('*', function (req, res, next) {
    res.locals.user = req.user;
    next();
  });

  const cors = require('cors')
  app.use(cors())
  app.use(express.json())


  const apiuser = require('./routes/api/user')
  app.use('/',apiuser)
  

  const apipost = require('./routes/api/post')
app.use('/',apipost)


  const userrouter = require('./routes/usersRouter')
  app.use('/',userrouter)


  const router = require('./routes/PostRouter')
  app.use('/',router)