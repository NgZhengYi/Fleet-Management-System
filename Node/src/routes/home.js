const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/HomeData', (req, res) => {
    let sqlDriverType = `SELECT SUM(CASE WHEN driver_type = 'A' THEN 1 ELSE 0 END) AS A, 
        SUM(CASE WHEN driver_type = 'B' THEN 1 ELSE 0 END) AS B, 
        SUM(CASE WHEN driver_type = 'C' THEN 1 ELSE 0 END) AS C, 
        SUM(CASE WHEN driver_type = 'D' THEN 1 ELSE 0 END) AS D 
        FROM VMS_DRIVER_DETAIL`;

    let sqlVehicleStatus = `SELECT SUM(CASE WHEN vehicle_status = 'Available' AND auto_id  
        IN (SELECT driver_vehicle FROM VMS_DRIVER_DETAIL WHERE driver_vehicle IS NOT NULL) THEN 1 ELSE 0 END) AS assigned_vehicle, 
        SUM(CASE WHEN vehicle_status = 'Available' AND auto_id NOT
        IN (SELECT driver_vehicle FROM VMS_DRIVER_DETAIL WHERE driver_vehicle IS NOT NULL) THEN 1 ELSE 0 END) AS unassigned_vehicle
        FROM VMS_VEHICLE`;

    let sqlWorkshopStatus = `SELECT SUM(CASE WHEN workshop_status = 'Available' THEN 1 ELSE 0 END) AS available_workshop, 
        COUNT(*) AS total_workshop FROM VMS_WORKSHOP`;

    let sqlTaskStatus = `SELECT SUM(CASE WHEN (VT.task_date_start <= current_date AND VT.task_date_end >= current_Date) 
        AND (VTA.driver_identity IS NOT NULL) THEN 1 ELSE 0 END) AS ongoing, 
        SUM(CASE WHEN (VT.task_date_start > current_date) AND (VTA.driver_identity IS NOT NULL) THEN 1 ELSE 0 END) AS upcoming, 
        SUM(CASE WHEN (VT.task_date_start >= current_date) AND (VTA.driver_identity IS NULL) THEN 1 ELSE 0 END) AS unassigned 
        FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity`;

    let sqlMaintenanceStatus = `SELECT SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) AS pending, 
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) AS completed
        FROM VMS_MAINTENANCE`;

    database.task(async t => {
        let DriverType = await t.manyOrNone(sqlDriverType);
        let VehicleStatus = await t.manyOrNone(sqlVehicleStatus);
        let WorkshopStatus = await t.manyOrNone(sqlWorkshopStatus);
        let TaskStatus = await t.manyOrNone(sqlTaskStatus);
        let MaintenanceStatus = await t.manyOrNone(sqlMaintenanceStatus);

        return {DriverType, VehicleStatus, WorkshopStatus, TaskStatus, MaintenanceStatus};
    }).then(result => {
        console.log(result);
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
