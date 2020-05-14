const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/MaintenanceList', (req, res) => {
    let sqlScheduledList = `SELECT VM.auto_id, VV.vehicle_code as vehicle, VW.workshop_name as workshop, 
        TO_CHAR(VM.scheduled_date, 'YYYY-MM-DD') AS scheduled_date
        FROM VMS_MAINTENANCE VM 
        JOIN VMS_WORKSHOP VW on VW.auto_id = VM.workshop_identity
        JOIN VMS_VEHICLE VV on VV.auto_id = VM.vehicle_identity 
        WHERE VM.status = 'PENDING' OR VM.status = 'PROCESSING' 
        ORDER BY VM.scheduled_date`;
    let sqlCompleteList = `SELECT VM.auto_id, VV.vehicle_code as vehicle, VW.workshop_name as workshop, 
        TO_CHAR(VM.completed_date, 'YYYY-MM-DD') AS completed_date
        FROM VMS_MAINTENANCE VM 
        JOIN VMS_WORKSHOP VW on VW.auto_id = VM.workshop_identity
        JOIN VMS_VEHICLE VV on VV.auto_id = VM.vehicle_identity 
        WHERE VM.status = 'COMPLETED' 
        ORDER BY VM.completed_date DESC`;

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

router.get('/SelectWorkshop', (req, res) => {
    let selectWorkshopQuery = `SELECT auto_id, workshop_code, workshop_name, workshop_region 
        FROM VMS_WORKSHOP WHERE workshop_status = 'Available' `;

    database.task(async t => {
        return await t.manyOrNone(selectWorkshopQuery);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/SelectVehicle', (req, res) => {
    let selectVehicleQuery = `SELECT auto_id, vehicle_code, vehicle_type, vehicle_plate, 
        TO_CHAR(vehicle_last_maintenance, 'YYYY-MM-DD') AS vehicle_last_maintenance 
        FROM VMS_VEHICLE WHERE vehicle_status = 'Available'`;

    database.task(async t => {
        return await t.manyOrNone(selectVehicleQuery);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SingleMaintenance', (req, res) => {
    let identity = req.body.ID;
    let selectMaintenanceQuery = `SELECT VW.auto_id AS workshop_identity, VW.workshop_code, VW.workshop_name, 
        VV.auto_id AS vehicle_identity, VV.vehicle_code, VV.vehicle_plate, VV.vehicle_manufacturer, VV.vehicle_model,
        VM.status, VM.maintenance_description, 
        TO_CHAR(VM.scheduled_date, 'YYYY-MM-DD') AS scheduled_date, TO_CHAR(VM.completed_date, 'YYYY-MM-DD') AS completed_date 
        FROM VMS_MAINTENANCE VM  
        JOIN VMS_WORKSHOP VW on VW.auto_id = VM.workshop_identity
        JOIN VMS_VEHICLE VV on VV.auto_id = VM.vehicle_identity 
        WHERE VM.auto_id = $1`;

    database.task(async t => {
        return await t.manyOrNone(selectMaintenanceQuery, [identity]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/Update-Maintenance', (req, res) => {
    let maintenance = req.body.maintenance;
    let updateQuery = `UPDATE VMS_MAINTENANCE SET scheduled_date = $2, vehicle_identity = $3, workshop_identity = $4, 
        maintenance_description = $5, status = $6 WHERE auto_id = $1`;
    let updateCompletedQuery = `UPDATE VMS_MAINTENANCE SET scheduled_date = $2, vehicle_identity = $3, workshop_identity = $4, 
        maintenance_description = $5, status = $6, completed_date = current_date WHERE auto_id = $1`;
    let updateParams = [maintenance.auto_identity, maintenance.scheduled_date, maintenance.vehicle_identity,
        maintenance.workshop_identity, maintenance.maintenance_description, maintenance.maintenance_status];
    let updateVehicleLastMaintenanceQuery = `UPDATE VMS_VEHICLE SET vehicle_last_maintenance = current_date WHERE auto_id = $1`;

    database.task(async t => {
        if (maintenance.maintenance_status === 'COMPLETED') {
            await t.manyOrNone(updateCompletedQuery, updateParams);
            await t.manyOrNone(updateVehicleLastMaintenanceQuery, [maintenance.vehicle_identity]);
        } else {
            await t.manyOrNone(updateQuery, updateParams);
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/History-Maintenance', (req, res) => {
    let historyQuery = `SELECT VM.auto_id, VV.vehicle_code, VV.vehicle_model, VW.workshop_code, VW.workshop_name,  
        TO_CHAR(VM.completed_date, 'YYYY-MM-DD') AS completed_date 
        FROM VMS_MAINTENANCE VM 
        JOIN VMS_VEHICLE VV ON VM.vehicle_identity = VV.auto_id 
        JOIN VMS_WORKSHOP VW ON VM.workshop_identity = VW.auto_id 
        WHERE VM.status = 'COMPLETED' 
        ORDER BY VM.completed_date DESC`;

    database.task(async t => {
        return await t.manyOrNone(historyQuery);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/Single-Vehicle-History-Maintenance', (req, res) => {
    let vehicle_code = req.body.CODE;
    let vehicleHistoryQuery = `SELECT VM.auto_id, VV.vehicle_code, VV.vehicle_model, VW.workshop_code, VW.workshop_name,  
        TO_CHAR(VM.completed_date, 'YYYY-MM-DD') AS completed_date 
        FROM VMS_MAINTENANCE VM 
        JOIN VMS_VEHICLE VV ON VM.vehicle_identity = VV.auto_id 
        JOIN VMS_WORKSHOP VW ON VM.workshop_identity = VW.auto_id 
        WHERE VM.status = 'COMPLETED' AND VV.vehicle_code = $1 
        ORDER BY VM.completed_date DESC`;

    database.task(async t => {
        return await t.manyOrNone(vehicleHistoryQuery, [vehicle_code]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/Vehicle-Code-List', (req, res) => {
    let vehicleQuery = `SELECT vehicle_code FROM VMS_VEHICLE`;

    database.task(async t => {
       return await t.manyOrNone(vehicleQuery);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
