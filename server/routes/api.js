var express = require('express');
var router = express.Router();
const data = require('./data');

/* GET users listing. */
router.get('/routes', function(req, res) {
  res.json(data);
});

router.get('/routes/:id', function(req, res) {
  const found = data.some(a => a.id === parseInt(req.params.id));
  if (found) {
    res.json(data.filter(a => a.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No route with the id of ${req.params.id}`})
  }
});

router.post('/routes', function(req, res) {
  res.send(req.body)
});

module.exports = router;
