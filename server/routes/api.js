const express = require('express');
const router = express.Router();
const RouteModel = require('../models/routes');
const SensorModel = require('../models/sensors');

/* GET users listing. */
router.get('/routes', async (req, res) => {
  try {
    const routes = await RouteModel.find();
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].prediction.length === 0) {
        let result = update_prediction(routes[i]);
        routes[i].prediction = result;
        var sum = 0;
        for (let j = 0; j < result.length; j++) {
          sum += result[j];
        }
        routes[i].ranking = sum;
        routes[i].last_updated = Date.now();
        routes[i].save();
      }
    }
    await RouteModel.find({}).sort({ranking: 1}).exec(function(err, routes){
      if (err) {
        res.status(500).json({msg: err.message})
      } else {
        res.json(routes);
      }
    });

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
  let prediction_values = [];
  console.log(route.name);
  let closest_sensor = await find_closest_sensor(route);
  console.log(closest_sensor.latitude);
  let now = new Date;
  let day = 6;
  if (now.getDay() !== 0) {
    day = now.getDay() - 1;
  }
  let daily_factor = closest_sensor.daily[day];
  let monthly_factor = closest_sensor.monthly[now.getMonth()];
  for (let i = 5; i <= 20; i++) {
    prediction_values.push(((closest_sensor.hourly[i]/365) + (daily_factor/52/24) + (monthly_factor/30/24))/3);
  }
  return prediction_values;
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
