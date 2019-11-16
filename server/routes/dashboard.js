var express = require('express');
var router = express.Router();
const data = require('./data');

/* GET users listing. */
router.get('/routes', function(req, res) {
    res.render('index', {data})
});

router.get('/routes/:id', function(req, res) {
    res.send(req.params.id);
});

module.exports = router;