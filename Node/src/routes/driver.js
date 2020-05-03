const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/LoadDriver', (req, res) => {
    let sqlFetchDriver = `SELECT VDD.auto_id, VDD.driver_code, VDD.driver_name, VDD.driver_type, VV.vehicle_code, VV.vehicle_type 
        FROM VMS_DRIVER_DETAIL VDD 
        LEFT JOIN VMS_VEHICLE VV ON VDD.driver_vehicle = VV.auto_id ORDER BY VDD.driver_code`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetchDriver);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result})
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/SelectVehicle', (req, res) => {
    let sqlVehicle = `SELECT auto_id, vehicle_code, vehicle_plate, vehicle_type FROM VMS_VEHICLE 
        WHERE vehicle_status = 'Available' AND auto_id NOT IN 
        (SELECT driver_vehicle FROM VMS_DRIVER_DETAIL WHERE driver_vehicle IS NOT NULL)`;

    database.task(async task => {
        return await task.manyOrNone(sqlVehicle);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SingleDriver', (req, res) => {
    let driver_identity = req.body.ID;
    let sqlFetchDriver = `SELECT VDD.auto_id, VDD.driver_code, VDD.driver_name, VDD.driver_license, VDD.driver_type, 
        VDD.driver_status, VV.auto_id as vehicle_identity, VV.vehicle_code
        FROM VMS_DRIVER_DETAIL VDD LEFT JOIN VMS_VEHICLE VV ON VDD.driver_vehicle = VV.auto_id
        WHERE VDD.auto_id = $1`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetchDriver, [driver_identity]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/UpdateDriver', (req, res) => {
    let driver = req.body.DETAIL;
    let sqlUpdate = `UPDATE VMS_DRIVER_DETAIL SET driver_code = $2, driver_name = $3, driver_license = $4, 
        driver_type = $5, driver_status = $6, driver_vehicle = $7 WHERE auto_id = $1`;
    let sqlParams = [driver.driver_identity, driver.driver_code, driver.driver_name, driver.driver_license,
        driver.driver_type, driver.driver_status, driver.vehicle_identity];

    database.task(async task => {
        return await task.manyOrNone(sqlUpdate, sqlParams);
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
