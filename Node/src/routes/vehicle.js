const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/LoadVehicleData', (req, res) => {
    let sqlFetch = `SELECT auto_id, vehicle_code, vehicle_type, vehicle_plate, vehicle_status, vehicle_manufacturer,  
        TO_CHAR(vehicle_last_maintenance, 'YYYY-MM-DD') AS vehicle_last_maintenance 
        FROM VMS_VEHICLE ORDER BY CASE vehicle_status
        WHEN 'Available' THEN 1 WHEN 'Maintenance' THEN 2 ELSE 3 END`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetch);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    })
});

router.post('/InsertVehicle', (req, res) => {
    let vehicle = req.body.vehicle;
    let vehicleCodeCount = `SELECT COUNT(*) FROM VMS_VEHICLE WHERE vehicle_code = $1`;
    let sqlInsert = `INSERT INTO VMS_VEHICLE (vehicle_code, vehicle_type, vehicle_manufacturer, vehicle_model, 
        vehicle_year, vehicle_max_load, vehicle_plate) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    let vehicleParams = [vehicle.vehicle_code, vehicle.vehicle_type, vehicle.vehicle_manufacturer, vehicle.vehicle_model,
        vehicle.vehicle_year, vehicle.vehicle_max_load, vehicle.vehicle_plate];

    database.task(async task => {
        let vehicleCodeCount = await task.manyOrNone(vehicleCodeCount, [vehicle.vehicle_code]);

        if (vehicleCodeCount[0].count !== '0') {
            res.send({message: 'Failed', error: 'Duplicated Vehicle Code'});
        } else {
            await task.manyOrNone(sqlInsert, vehicleParams);
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SingleVehicle', (req, res) => {
    let vehicle_identity = req.body.identity;
    let sqlSelect = `SELECT vehicle_code, vehicle_type, vehicle_manufacturer, vehicle_model, vehicle_year, vehicle_max_load, 
        vehicle_plate, vehicle_status, TO_CHAR(vehicle_last_maintenance, 'YYYY-MM-DD') AS vehicle_last_maintenance 
        FROM VMS_VEHICLE WHERE auto_id = $1`;

    database.task(async task => {
        return await task.manyOrNone(sqlSelect, [vehicle_identity]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/UpdateVehicle', (req, res) => {
    let vehicle = req.body.vehicle;
    let vehicleCodeValidator = `SELECT COUNT(*) FROM VMS_VEHICLE WHERE vehicle_code = $1`;
    let vehicleUpdate = `UPDATE VMS_VEHICLE SET vehicle_code = $2, vehicle_type = $3, vehicle_manufacturer = $4, 
        vehicle_model = $5, vehicle_year = $6, vehicle_max_load = $7, vehicle_plate = $8, vehicle_status = $9 
        WHERE auto_id = $1`;
    let vehicleParams = [vehicle.auto_identity, vehicle.vehicle_code, vehicle.vehicle_type, vehicle.vehicle_manufacturer,
        vehicle.vehicle_model, vehicle.vehicle_year, vehicle.vehicle_max_load, vehicle.vehicle_plate, vehicle.vehicle_status];

    database.task(async task => {
        let vehicleCodeCount = await task.manyOrNone(vehicleCodeValidator, [vehicle.vehicle_code]);

        if (vehicleCodeCount[0].count !== '0') {
            res.send({message: 'Failed', error: 'Duplicated Vehicle Code'});
        } else {
            await task.manyOrNone(vehicleUpdate, vehicleParams);
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
