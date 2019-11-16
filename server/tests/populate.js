require('dotenv').config();
const mongoose = require('mongoose');
const routes = require("./data");
const RouteModel = require('../models/routes');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
    console.log("Connected to database");
    populate();
    setTimeout(function() {
        db.close();
    }, 200);

});

function populate() {
    for (let i = 0; i < routes.length; i++) {
        console.log(routes[i].name);
        try {
            let route = new RouteModel({
                name: routes[i].name,
                status: routes[i].status,
                coordinates: routes[i].coordinates
            });
            route.save()
        } catch (e) {
            console.log(e.message);
        }
    }
}



// module.exports = populate();


