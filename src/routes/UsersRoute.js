const express = require('express');
const router = express.Router();
const UsersModel = require('../models/Users');
const {
    responseSuccess, responseError,
    regExpSearch, convertToObjectId,
} = require('../utils/shared');
router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const conditions = {
            isDeleted: "No",
            username: username,
        };
        const result = await UsersModel.findOne(conditions);
        if (!result) return res.json(responseError("Username or password is wrong", {}));
        if (+result.password !== +password) return res.json(responseError("Username or password is wrong", {}));
        return res.json(responseSuccess("Login successfully", result));
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.post('/users/register', async (req, res) => {
    try {
        const { username, email, password,
        } = req.body;
        const set = {};
        set.username = username;
        set.email = email;
        set.password = password;
        const result = await UsersModel.create(set);
        if (result) {
            return res.json(responseSuccess("Create a user successfully!", result));
        }
        return res.json(responseError("Create a user fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.get('/products/info', async (req, res) => {
    try {
        const { userObjId } = req.query;
        const conditions = {
            _id: convertToObjectId(userObjId),
        }
        const result = await UsersModel.findOne(conditions);
        if (result) {
            return res.json(responseSuccess("Find a user successfully!", result));
        }
        return res.json(responseError("Find a user fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

module.exports = router;