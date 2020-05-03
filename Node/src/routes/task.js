const express = require('express');
const database = require('../database');
const router = express.Router();

router.get('/TaskList', (req, res) => {
    let sqlTodayTask = `SELECT VT.auto_id, VT.task_title, VT.task_status, 
        TO_CHAR(VT.task_date_start, 'YYYY-MM-DD') AS task_date_start, TO_CHAR(VT.task_date_end, 'YYYY-MM-DD') AS task_date_end 
        FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity
        WHERE (VT.task_date_start <= current_date AND VT.task_date_end >= current_Date) AND (VTA.driver_identity IS NOT NULL)`;
    let sqlUpcomingTask = `SELECT VT.auto_id, VT.task_title, 
        TO_CHAR(VT.task_date_start, 'YYYY-MM-DD') as task_date_start, TO_CHAR(VT.task_date_end, 'YYYY-MM-DD') as task_date_end 
        FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity
        WHERE (VT.task_date_start > current_date) AND (VTA.driver_identity IS NOT NULL) 
        ORDER BY VT.task_date_start`;
    let sqlUnassignedTask = `SELECT VT.auto_id, VT.task_title, 
        TO_CHAR(VT.task_date_start, 'YYYY-MM-DD') as task_date_start, TO_CHAR(VT.task_date_end, 'YYYY-MM-DD') as task_date_end 
        FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity
        WHERE (VT.task_date_start >= current_date) AND (VTA.driver_identity IS NULL) 
        ORDER BY VT.task_date_start`;

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
    let task = req.body.task;
    console.log(task);
    let taskQuery = `INSERT INTO VMS_TASK (task_title, task_detail, task_depart, task_destination, task_date_start, 
        task_date_end, task_time_start, task_time_end, task_created_by, task_created_timestamp) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, current_timestamp) RETURNING auto_id`;
    let taskParams = [task.task_title, task.task_detail, task.task_depart, task.task_destination, task.task_date_start,
        task.task_date_end, task.task_time_start, task.task_time_end, task.task_created_by];
    let taskValidationQuery = `SELECT COUNT(*) FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity 
        WHERE VTA.driver_identity = $1 AND (VT.task_date_start BETWEEN $2 AND $3) AND (VT.task_date_end BETWEEN $2 AND $3)`

    database.task(async t => {
        if (task.task_driver) {
            let validationParams = [task.task_driver, task.task_date_start, task.task_date_end];
            let validationCount = await t.manyOrNone(taskValidationQuery, validationParams);

            if (validationCount[0].count !== '0') {
                return {message: 'Failed', error: 'Driver Schedule Clashed'};
            } else {
                let task_identity = await t.manyOrNone(taskQuery, taskParams);
                let taskAssignmentQuery = `INSERT INTO VMS_TASK_ASSIGNMENT (task_identity, driver_identity, task_assigned_by, 
                task_assigned_timestamp) VALUES ($1, $2, $3, current_timestamp)`;
                await t.manyOrNone(taskAssignmentQuery, [task_identity[0].auto_id, task.task_driver, task.task_created_by]);
                return {message: 'Success'};
            }
        } else {
            let task_identity = await t.manyOrNone(taskQuery, taskParams);
            let taskAssignmentQuery = `INSERT INTO VMS_TASK_ASSIGNMENT (task_identity) VALUES ($1)`;
            await t.manyOrNone(taskAssignmentQuery, [task_identity[0].auto_id]);
            return {message: 'Success'};
        }
    }).then(result => {
        return res.status(201).json({message: result.message, error: result.error});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SingleTask', (req, res) => {
    let task_identity = req.body.ID;
    let checkTaskDriver = `SELECT driver_identity FROM VMS_TASK_ASSIGNMENT WHERE task_identity = $1`;
    let UnassignedTaskQuery = `SELECT VT.task_title, VT.task_time_start, VT.task_time_end, 
        TO_CHAR(VT.task_date_start, 'YYYY-MM-DD') AS task_date_start, TO_CHAR(VT.task_date_end, 'YYYY-MM-DD') AS task_date_end,  
        VT.task_depart, VT.task_destination, VT.task_detail, VT.task_status 
        FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity
        WHERE VT.auto_id = $1`;
    let AssignedTaskQuery = `SELECT VT.task_title, VD.driver_code, VD.driver_name, VTA.driver_identity, 
        TO_CHAR(VT.task_date_start, 'YYYY-MM-DD') AS task_date_start, TO_CHAR(VT.task_date_end, 'YYYY-MM-DD') AS task_date_end,  
        VT.task_time_start, VT.task_time_end, VT.task_depart, VT.task_destination, VT.task_detail, VT.task_status   
        FROM VMS_TASK VT 
        JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity 
        JOIN VMS_DRIVER_DETAIL VD ON VD.auto_id = VTA.driver_identity
        WHERE VT.auto_id = $1`;

    database.task(async task => {
        let taskDriverCount = await task.manyOrNone(checkTaskDriver, [task_identity]);

        if (taskDriverCount[0].driver_identity === null) {
            return await task.manyOrNone(UnassignedTaskQuery, [task_identity]);
        } else {
            return await task.manyOrNone(AssignedTaskQuery, [task_identity]);
        }
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/UpdateTask', (req, res) => {
    let task = req.body.DETAIL;
    console.log(task);
    let taskValidationQuery = `SELECT COUNT(*) FROM VMS_TASK VT JOIN VMS_TASK_ASSIGNMENT VTA ON VT.auto_id = VTA.task_identity 
        WHERE VTA.driver_identity = $1 AND (VT.task_date_start BETWEEN $2 AND $3) AND (VT.task_date_end BETWEEN $2 AND $3) 
        AND VT.auto_id != $4`;
    let updateTaskQuery = `UPDATE VMS_TASK SET task_title = $2, task_date_start = $3, task_date_end = $4, 
        task_time_start = $5, task_time_end = $6, task_depart = $7, task_destination = $8, task_detail = $9, task_status = $10 
        WHERE auto_id = $1`;
    let updateTaskParams = [task.auto_identity, task.task_title, task.task_date_start, task.task_date_end, task.task_time_start,
        task.task_time_end, task.task_depart, task.task_destination, task.task_detail, task.task_status];
    let updateTaskAssignmentQuery = `UPDATE VMS_TASK_ASSIGNMENT SET driver_identity = $2, task_assigned_by = $3, 
        task_assigned_timestamp = current_timestamp WHERE task_identity = $1`;
    let updateTaskAssignmentParams = [task.auto_identity, task.driver_identity, task.task_assigned_by];

    database.task(async t => {
        if (task.task_driver) {
            let taskValidationParams = [task.driver_identity, task.task_date_start, task.task_date_end, task.auto_identity];
            let validationCount = await t.manyOrNone(taskValidationQuery, taskValidationParams);

            if (validationCount[0].count !== '0') {
                console.log('Driver Schedule Clashed');
                return {message: 'Failed', error: 'Driver Schedule Clashed'};
            } else {
                await t.manyOrNone(updateTaskQuery, updateTaskParams);
                await t.manyOrNone(updateTaskAssignmentQuery, updateTaskAssignmentParams);
            }
        } else {
            await t.manyOrNone(updateTaskQuery, updateTaskParams);
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.get('/TaskHistory', (req, res) => {
    let sqlHistory = `SELECT auto_id, task_title, task_detail, task_status, 
        TO_CHAR(task_date_start, 'YYYY-MM-DD') AS task_date_start, TO_CHAR(task_date_end, 'YYYY-MM-DD') AS task_date_end 
        FROM VMS_TASK WHERE task_date_end < current_date ORDER BY task_date_start DESC`;

    database.task(async task => {
        return await task.manyOrNone(sqlHistory);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/SelectDriver', (req, res) => {
    let FetchDriverQuery = `SELECT auto_id, driver_code, driver_name, driver_type FROM VMS_DRIVER_DETAIL 
        WHERE auto_id NOT IN (
        SELECT VTA.driver_identity FROM VMS_TASK_ASSIGNMENT VTA JOIN VMS_TASK VT ON VTA.task_identity = VT.auto_id 
        WHERE ($1 BETWEEN VT.task_date_start AND VT.task_date_end) AND ($2 BETWEEN VT.task_date_start AND VT.task_date_end) 
        AND VTA.driver_identity IS NOT NULL)`;
    let FetchDriverParams = [req.body.date_start, req.body.date_end];

    database.task(async task => {
        return await task.manyOrNone(FetchDriverQuery, FetchDriverParams);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
