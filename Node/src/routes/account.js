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
        let sqlUsername = `SELECT user_password, user_role FROM VMS_USER_ACCOUNT WHERE user_username = $1`;
        let sqlUsernameParam = [username];

        return await task.manyOrNone(sqlUsername, sqlUsernameParam);
    }).then(result => {
        // console.log(result);
        if (result.length === 0) {
            // return res.status(401).json({message: 'Failed', error: 'Username Not Found'});
            res.send({message: 'Failed', error: 'Username Not Found'});
        } else {
            bcrypt.compare(password, result[0].user_password, (error, value) => {
                if (value) {
                    let payload = {username: username, role: result[0].user_role};
                    const token = jwt.sign(payload, secretKEY, tokenOptions);
                    return res.status(201).json({message: 'Success', result: {token: token}});
                } else {
                    // return res.status(401).json({message: 'Failed', error: 'Password Not Match'});
                    res.send({message: 'Failed', error: 'Password Not Match'});
                }
            });
        }
    });
});

router.post('/ValidateToken', (req, res) => {
    const token = req.body.token;
    // console.log(token);

    let tokenStatus;

    jwt.verify(token, 'I Love You', (error) => {
        tokenStatus = !error;
    });

    if (tokenStatus) {
        // console.log('Validate Token - Token Valid');

        // let decodedToken = jwt.decode(token);
        // console.log(decodedToken);

        // Perform Role Validation

        res.send({
            message: 'True'
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
        let registerAccount = `INSERT INTO VMS_USER_ACCOUNT (username, password, role) VALUES ($1, $2, $3)`;
        let driver_detail = `INSERT INTO VMS_DRIVER_DETAIL (driver_code, driver_name, driver_license, driver_skill_level) 
            VALUES ($1, $2, $3, $4)`;
        let workshop_detail = `INSERT INTO VMS_WORKSHOP_DETAIL (workshop_code, workshop_location, workshop_address) 
            VALUES ($1, $2, $3)`;

        if (account.role === 'ADMIN') {
            console.log('Admin');
            res.send({message: 'Success', error: 'Duplicate Code'})
        }

        if (account.role === 'DRIVER') {
            console.log('Driver');
        }

        if (account.role === 'WORKSHOP') {
            console.log('WorkShop');
        }
    }).then(reuslt => {

    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;
