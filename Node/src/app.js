const express = require("express");
const bodyParser = require("body-parser");

const commonRoute = require("./routes/common");
const accountRoute = require("./routes/account");
const vehicleRoute = require("./routes/vehicle");
const driverRoute = require("./routes/driver");
const taskRoute = require("./routes/task");
const maintenanceRoute = require("./routes/maintenance");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/common', commonRoute);
app.use('/api/account', accountRoute);
app.use('/api/vehicle', vehicleRoute);
app.use('/api/driver', driverRoute);
app.use('/api/task', taskRoute);
app.use('/api/maintenance', maintenanceRoute);

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = app;
