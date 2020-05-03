const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/MaintenanceList', (req, res) => {
    let sqlScheduledList = `select vms.auto_id, vms.scheduled_date, vvd.vehicle_name as vehicle, vwd.workshop_name as workshop
        from vms_maintenance vms 
        join vms_workshop_detail vwd on vwd.auto_id = vms.workshop_identity
        join vms_vehicle_detail vvd on vvd.auto_id = vms.vehicle_identity 
        where vms.status = 'PENDING'
        ORDER BY vms.scheduled_date`;
    let sqlCompleteList = `SELECT vms.auto_id, vms.completed_date, vvd.vehicle_name as vehicle, vwd.workshop_name as workshop
        from vms_maintenance vms 
        join vms_workshop_detail vwd on vwd.auto_id = vms.workshop_identity
        join vms_vehicle_detail vvd on vvd.auto_id = vms.vehicle_identity 
        where vms.status = 'COMPLETED'
        ORDER BY vms.completed_date DESC`;

    database.task(async t => {
        let scheduledList = await t.manyOrNone(sqlScheduledList);
        let completedList = await t.manyOrNone(sqlCompleteList);
        return {scheduled: scheduledList, completed: completedList};
    }).then(result => {
        return res.status(201).json({message: 'Success', scheduled: result.scheduled, completed: result.completed});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/MaintenanceAutoField', (req, res) => {
    let sqlWorkshop = `SELECT auto_id, workshop_name FROM VMS_WORKSHOP_DETAIL`;
    let sqlVechile = `SELECT auto_id, vehicle_code FROM VMS_VEHICLE_DETAIL`;

    database.task(async t => {
        let workshop = await t.manyOrNone(sqlWorkshop);
        let vehicle = await t.manyOrNone(sqlVechile);

        return {workshop, vehicle};
    }).then(result => {
        return res.status(201).json({message: 'Success', workshop: result.workshop, vehicle: result.vehicle})
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    })
});

router.post('/New-Maintenance', (req, res) => {
    let maintenance = req.body.maintenance;
    let sqlValidaiton = `SELECT COUNT(*) FROM VMS_MAINTENANCE WHERE 
        VEHICLE_IDENTITY = $1 AND SCHEDULED_DATE = $2`;
    let sqlInsert = `INSERT INTO VMS_MAINTENANCE (WORKSHOP_IDENTITY, VEHICLE_IDENTITY, SCHEDULED_DATE) VALUES 
        ($1, $2, $3)`;

    database.task(async t => {
        let validationParams = [maintenance.vehicle, maintenance.date];
        let insertParams = [maintenance.workshop, maintenance.vehicle, maintenance.date];

        let validationLength = await t.manyOrNone(sqlValidaiton, validationParams);
        console.log(validationLength);
        if (validationLength[0].count > 0) {
            res.send({message: 'Duplicated'});
        } else {
            await t.manyOrNone(sqlInsert, insertParams);
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });

});

module.exports = router;
