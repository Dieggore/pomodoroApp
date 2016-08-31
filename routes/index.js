var express = require('express');
var Users = require('../models/Users')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/tasks', function(req, res , next){
  Users.fetchAll()
  .then( data => {
     return Tasks.fetchAll({  });
  })
  .then( )
  .catch( error =>{
    res.json(error.message);
    console.error("error", error);
  })
});

module.exports = router;
