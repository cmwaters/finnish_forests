var express = require('express');
var router = express.Router();
const data = require('./data');
const RouteModel = require('../models/routes');

/* GET users listing. */
router.get('/routes', async (req, res) => {
  try {
    const routes = await RouteModel.find();
    res.json(routes);
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
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
  const route = new RouteModel({
    name: req.body.name
  });
  try {
    const newRoute = route.save();
    res.status(201).json(route);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
