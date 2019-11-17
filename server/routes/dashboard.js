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
        res.status(500).json({ msg: e.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        console.log(route.name);
        route.remove();
        //res.redirect(req.baseUrl + '/dashboard');
        
        res.status(201).json({ msg: `deleted route with id ${req.params.id}` });
        
    } catch (e) {
        res.status(500).json({ msg: e.message })
    }
});

router.get('/:id/open', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log("Opening Route");
        const route = await RouteModel.findById(req.params.id);
        console.log(route.name);
        route.status = "Open";
        route.save();
        res.redirect(req.baseUrl);
        res.end();
    } catch(e) {
        res.status(404).json({ msg: e.message});
        res.end();
    }
});

router.get('/:id/close', async (req, res) => {
    try {
        console.log("Closing Route");
        const route = await RouteModel.findById(req.params.id);
        route.status = "Closed";
        route.save();
        res.redirect(req.baseUrl);
        res.end();
    } catch(e) {
        res.status(404).json({ msg: e.message});
        res.end();
    }
});

module.exports = router;