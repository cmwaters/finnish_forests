var express = require('express');
var router = express.Router();
const data = require('./data');

router.get('/', function(req, res) {
    res.render('dashboard', {title: 'Dashboard'})
});

router.get('/routes', function(req, res) {
    res.render('dashboard', {title: 'Dashboard routes', routes: data})
});

router.get('/routes/:id', function(req, res) {
    res.send(req.params.id);
});

module.exports = router;