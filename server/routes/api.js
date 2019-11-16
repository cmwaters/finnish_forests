const express = require('express');
const router = express.Router();
const RouteModel = require('../models/routes');
const SensorModel = require('../models/sensors');

/* GET users listing. */
router.get('/routes', async (req, res) => {
  try {
    const routes = await RouteModel.find();
    update_prediction(routes[0]);
    // for (let i = 0; i < routes.length; i++) {
    //   if (routes[i].prediction.length === 0) {
    //     update_prediction(routes[i]);
    //   }
    // }
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

async function update_prediction(route) {
  console.log(route.name);
  let closest_sensor = await find_closest_sensor(route);
  console.log(closest_sensor.latitude);
  let now = new Date;
  // console.log(closest_sensor.hourly[now.getHours()]);
}

async function find_closest_sensor(route) {
  let shortest_distance = null;
  let chosen_sensor = null;
  let sensors = await SensorModel.find();
  for (let i = 0; i < sensors.length; i++) {
    let distance = Math.pow(Math.pow((sensors[i].latitude - route.coordinates[0].lat),2)
        + Math.pow((sensors[i].longitude - route.coordinates[0].lng),2), 0.5);
    if (shortest_distance === null || distance < shortest_distance) {
      shortest_distance = distance;
      chosen_sensor = sensors[i];
    }
  }
  return chosen_sensor;
}


module.exports = router;
