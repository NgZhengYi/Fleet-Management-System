const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/TaskList', (req, res) => {
    let sqlTodayTask = `SELECT auto_id, task_title, task_detail FROM VMS_TASK_SCHEDULE WHERE (task_date = current_date) 
        AND (task_driver_id != 'NaN' OR task_vehicle_id != 'NaN')`;
    let sqlUpcomingTask = `SELECT auto_id, task_title, task_date FROM VMS_TASK_SCHEDULE WHERE (task_date > current_date) 
        AND (task_driver_id != 'NaN' OR task_vehicle_id != 'NaN') ORDER BY task_date`;
    let sqlUnassignedTask = `SELECT auto_id, task_title, task_date FROM VMS_TASK_SCHEDULE WHERE (task_date >= current_date)
        AND (task_driver_id = 'NaN' OR task_vehicle_id = 'NaN') ORDER BY task_date`;

    database.task(async task => {
        let TodayTask = await task.manyOrNone(sqlTodayTask);
        let UpcomingTask = await task.manyOrNone(sqlUpcomingTask);
        let UnassignedTask = await task.manyOrNone(sqlUnassignedTask);

        return {todayTask: TodayTask, upcomingTask: UpcomingTask, unassignedTask: UnassignedTask};
    }).then(result => {
        return res.status(201).json({
            message: 'Success',
            todayTask: result.todayTask,
            upcomingTask: result.upcomingTask,
            unassignedTask: result.unassignedTask
        });
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
})

router.post('/NewTask', (req, res) => {
    let newTask = req.body.newTask;
    console.log(newTask);
    let sqlNewTask = `INSERT INTO VMS_TASK_SCHEDULE (task_title, task_detail, task_date, task_time, task_origin_location, 
        task_destination_location, task_driver_id, task_vehicle_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    let sqlParams = [newTask.task_title, newTask.task_detail, newTask.task_date, newTask.task_time,
        newTask.task_origin_location, newTask.task_destination_location, parseInt(newTask.task_driver, 10),
        parseInt(newTask.task_vehicle, 10)];

    database.task(async task => {
        await task.manyOrNone(sqlNewTask, sqlParams);
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SingleTask', (req, res) => {
    let task_identity = req.body.ID;
    let sqlFetchSingleTask = `SELECT task_title, task_detail, task_date, task_time, task_origin_location, 
        task_destination_location, task_driver_id, task_vehicle_id FROM VMS_TASK_SCHEDULE WHERE auto_id = $1`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetchSingleTask, [task_identity]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/UpdateTask', (req, res) => {
    let task = req.body.DETAIL;
    let sqlUpdate = `UPDATE VMS_TASK_SCHEDULE SET task_title = $2, task_detail = $3, task_date = $4, task_time = $5, 
        task_origin_location = $6, task_destination_location = $7, task_driver_id = $8, task_vehicle_id = $9 
        WHERE auto_id = $1`;
    let sqlParams = [task.task_identity, task.task_title, task.task_detail, task.task_date, task.task_time,
        task.task_origin_location, task.task_destination_location, task.task_driver_id, task.task_vehicle_id];

    database.task(async t => {
        return await t.manyOrNone(sqlUpdate, sqlParams);
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/TaskHistory', (req, res) => {
    let sqlHistory = `SELECT auto_id, task_title, task_detail, task_date, task_status FROM VMS_TASK_SCHEDULE 
        WHERE task_date < current_date ORDER BY task_date DESC`;

    database.task(async task => {
        return await task.manyOrNone(sqlHistory);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/SelectDriver', (req, res) => {
   let sqlDriver = `SELECT auto_id, driver_code FROM VMS_DRIVER_DETAIL`;

   database.task(async task => {
       return await task.manyOrNone(sqlDriver);
   }).then(result => {
       return res.status(201).json({message: 'Success', result: result});
   }).catch(error => {
       console.log(error);
       return res.status(500).json({message: 'Error'});
   });
});

module.exports = router;
