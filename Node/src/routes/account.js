const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/ValidateLogin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const secretKEY = 'I Love You';
    const tokenOptions = {
        expiresIn: '1h',
        algorithm: 'HS512'
    };

    // SQL search username -> If exist then compare hash password
    // Retrieve user Role

    if (username === 'admin' && password === 'admin') {
        let payload = {
            username: username,
            role: 'Admin'
        };

        const token = jwt.sign(payload, secretKEY, tokenOptions);

        res.send({
            message: 'Success',
            result: {
                token: token
            }
        })
    } else {
        res.send({
            message: 'Failed'
        })
    }
});

router.post('/ValidateToken', (req, res) => {
    const token = req.body.token;
    // console.log(token);

    let tokenStatus;

    jwt.verify(token, 'I Love You', (error) => {
        tokenStatus = !error;
    });

    if (tokenStatus) {
        console.log('Validate Token - Token Valid');

        let decodedToken = jwt.decode(token);
        // console.log(decodedToken);

        // Perform Role Validation

        res.send({
            message: 'True'
        })
    } else {
        console.log('Validate Token - Token Invalid');
        res.send({
            message: 'False'
        })
    }
});

module.exports = router;
