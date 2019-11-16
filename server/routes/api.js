const express = require('express');
const router = express.Router();
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

router.get('/routes/:id', async (req, res) => {
  const route = await RouteModel.findById(req.params.id);
  if (route) {
    res.json(route);
  } else {
    res.status(400).json({ msg: `No route with the id of ${req.params.id}`})
  }
});

router.post('/routes', function(req, res) {
  const route = new RouteModel({
    name: req.body.name,
    status: req.body.status,
    coordinates: req.body.coordinates
  });
  try {
    route.save();
    res.status(201).json(route);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.delete('/routes/:id', async (req, res) => {
  try {
    let route = await RouteModel.findById(req.params.id);
    route.remove();
    res.status(201).json({ msg: `deleted route with id ${req.params.id}` });
  } catch (e) {
    res.status(500).json({ msg: e.message })
  }
});

module.exports = router;
