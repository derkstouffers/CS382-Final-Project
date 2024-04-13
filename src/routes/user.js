const express = require('express');
const router = express.Router();

//Import user schema
const user = require('../models/user.js');

//user login api
router.post('/login', (req, res) => {
    //find user
    if (user === null) {
        return res.status(400).send({
            message : 'User Not Found.'
        });
    } //End if

    else {
        if (user.validPass(req.body.password)) {
            return res.status(201).send({
                message : 'User Logged In.'
            });
        } //end inner if

        else {
            return res.status(400).send({
                message : 'Wrong Password.'
            });
        } //End inner else
    } //End else
});

//user signup api
router.post('/register', (req, res, next) => {
    //create empty user obj
    let newUser = new user();
    
    //initialize newUser with request data
    newUser.name = req.body.name,

    newUser.email = req.body.email,

    newUser.password = req.body.password

    //call setPass function to hash password
    newUser.setPass(req.body.password);

    //save the new user to the DB
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message : "Failed to add new user"
            });
        } //end if

        else {
            return res.status(201).send({
                message : "User added successfully"
            });
        } //end else
    });
});

module.exports = router;