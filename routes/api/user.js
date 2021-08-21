const express = require('express');
const apiuser = express.Router();
const  User  = require('../../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt')


apiuser.get('/api/register',ensureAuthenticated,(req, res) => {
  User.find().sort({ createdAt: -1 })
  .then(result => {
    res.send(result);
    res.status(200).send();
  })
});

apiuser.post('/api/register', async (req, res) => {
    User.findOne({ username: req.body.username }).then( async user =>{
        if (user) { 
          res.status(300).send();
              }
      else {
          const salt = await bcrypt.genSalt(10);
          const user = User({
            email: req.body.email,
            username: req.body.username,
            role:'user',
            password: await bcrypt.hash(req.body.password, salt)
          });
          user.save();       
       res.status(201).send();
      }
    })
});

apiuser.post('/api/login', passport.authenticate('local', { 
}),
  function(req, res) {
  res.status(201).send({
    user:req.user,
  });
  }
  );

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      if(5<1){
        return next();
      }

    } else {
      res.status(500).send();
    }
  } 

module.exports = apiuser;