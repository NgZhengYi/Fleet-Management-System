const express = require('express');
const database = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/ValidateLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const secretKEY = 'I Love You';
    const tokenOptions = {
        expiresIn: '1d',
        algorithm: 'HS512'
    };

    database.task(async task => {
        let sqlUsername = `SELECT auto_id, user_password, user_role FROM VMS_USER_ACCOUNT WHERE user_username = $1`;
        let sqlUsernameParam = [username];

        return await task.manyOrNone(sqlUsername, sqlUsernameParam);
    }).then(result => {
        console.log(result);
        if (result.length === 0) {
            res.send({message: 'Failed', error: 'Username Not Found'});
        } else {
            bcrypt.compare(password, result[0].user_password, (error, value) => {
                if (value) {
                    let payload = {username: username, role: result[0].user_role};
                    const token = jwt.sign(payload, secretKEY, tokenOptions);
                    return res.status(201).json({message: 'Success', result: {token: token, identity: result[0].auto_id}});
                } else {
                    // return res.status(401).json({message: 'Failed', error: 'Password Not Match'});
                    res.send({message: 'Failed', error: 'Password Not Match'});
                }
            });
        }
    }).catch(error => {
        console.log(error);
        return res.send({message: 'Failed', error: error});
    });
});

router.post('/ValidateToken', (req, res) => {
    const token = req.body.token;

    let tokenStatus;

    jwt.verify(token, 'I Love You', (error) => {
        tokenStatus = !error;
    });

    if (tokenStatus) {
        // console.log('Validate Token - Token Valid');
        // let decodedToken = jwt.decode(token);

        // Perform Role Validation

        res.send({
            message: 'True',
        })
    } else {
        // console.log('Validate Token - Token Invalid');
        res.send({
            message: 'False'
        })
    }
});

router.post('/RegisterNewUser', (req, res) => {
    let account = req.body.account;

    console.log(account);

    database.task(async task => {
        let registerAccount = `INSERT INTO VMS_USER_ACCOUNT (user_username, user_password, user_role, user_email, user_phone) 
            VALUES ($1, $2, $3, $4, $5) RETURNING auto_id`;
        let driver_detail = `INSERT INTO VMS_DRIVER_DETAIL (driver_code, driver_name, driver_license, driver_type, 
            driver_account_identity) VALUES ($1, $2, $3, $4, $5)`;
        let workshop_detail = `INSERT INTO VMS_WORKSHOP (workshop_code, workshop_name, workshop_region, workshop_address) 
            VALUES ($1, $2, $3, $4)`;

        let password = await bcrypt.hashSync(account.password, 10);

        if (account.role === 'ADMIN') {
            console.log('Admin');
            res.send({message: 'Success', error: 'Duplicate Code'})
        }

        if (account.role === 'DRIVER') {
            console.log('Driver');
            let driver_identity = await task.manyOrNone(registerAccount, [
                account.username, password, account.role, account.email, account.phone
            ]);

            await task.manyOrNone(driver_detail, [
                account.driver_code, account.driver_name, account.driver_license, account.driver_type,
                parseInt(driver_identity[0].auto_id)
            ]);
        }

        if (account.role === 'WORKSHOP') {
            console.log('WorkShop');
        }
    }).then(() => {
        return res.status(201).json({message: 'Success'})
    }).catch(error => {
        console.log(error);
        return res.send({message: 'Failed', error: error});
    });
});

router.get('/LoadWorkshop', (req, res) => {
    let sqlFetchWorkshop = `SELECT auto_id, workshop_code, workshop_name, workshop_region, workshop_status 
        FROM VMS_WORKSHOP`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetchWorkshop);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result})
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/FetchSingleWorkshop', (req, res) => {
    let workshop_identity = req.body.ID;
    let sqlFetchWorkshop = `SELECT workshop_code, workshop_name, workshop_region, workshop_address, workshop_status 
        FROM VMS_WORKSHOP WHERE auto_id = $1`;

    database.task(async task => {
        return await task.manyOrNone(sqlFetchWorkshop, [workshop_identity]);
    }).then(result => {
        return res.status(201).json({message: 'Success', result: result[0]});
    }).catch(error => {
        console.log(error);
        return res.status(500).json({message: 'Error'});
    });
});

router.post('/UpdateWorkshop', (req, res) => {
    let workshop = req.body.DETAIL;
    console.log(workshop);
    let sqlUpdate = `UPDATE VMS_WORKSHOP SET workshop_code = $2, workshop_name = $3, workshop_region = $4, 
        workshop_address = $5, workshop_status = $6 WHERE auto_id = $1`;
    let sqlParams = [workshop.workshop_identity, workshop.workshop_code, workshop.workshop_name,
        workshop.workshop_region, workshop.workshop_address, workshop.workshop_status];

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
