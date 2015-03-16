var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Consequence' });
});

router.get('/play', function (req, res, next) {
  res.render('play', { title: 'Consequence' });
});

module.exports = router;
