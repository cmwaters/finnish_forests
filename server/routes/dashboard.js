const express = require('express');
const router = express.Router();
const RouteModel = require('../models/routes');

router.get('/', async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.render('dashboard', {routes: routes})
    } catch (e) {
        res.status(500).json({ msg: e.message })
    }
});

router.post('/', async (req, res) => {
    try {
        const route = new RouteModel({
            name: req.body.route.name
        });
        route.save();
        res.redirect(req.originalUrl)
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

module.exports = router;