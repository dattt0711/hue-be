require('dotenv').config()
const UsersService = require('../services/UsersService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configJwt = require('../configs/configJWT');
const moment = require('moment-timezone');
const { CODES_SUCCESS } = require('../utils/messages')
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
} = require('../utils/shared');
const { registerValidator, loginValidator } = require('../validators/UsersValidator');
module.exports.DEFAULT = {
    register: async (req, res) => {
        try {
            const errors = await validateResult(registerValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const { userName, password, email } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UsersService.create({
                username: userName,
                password: hashedPassword,
                email,
            })
            const accessToken = jwt.sign({
                username: userName,
                email: email,
                userObjId: result._id,
            },
                configJwt.secret,
                // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            // const expiresDate = moment(decoded.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            const paramsExpires = {};
            paramsExpires.userObjId = result._id;
            // paramsExpires.expiresDate = expiresDate;
            // await UsersService.updateExpiresDate(paramsExpires);
            delete result._doc.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10000,
                message: CODES_SUCCESS[10000],
                data: result,
            });
        } catch (err) {
            console.log(err, 'err')
            return res.json(err);
        }
    },
    login: async (req, res) => {
        try {
            const errors = await validateResult(loginValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const { userName, password } = req.body;
            // Check for existing user
            const user = await UsersService.findByConditions({ username: userName })
            if (!user)
                return res.json(responseError(40000, errors));
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.json(responseError(40000, errors));

            // Return token
            const accessToken = jwt.sign({
                username: user.username,
                email: user.email,
                userObjId: user._id,
            },
                configJwt.secret,
                // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            // const expiresDate = moment(decoded.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            // const paramsExpires = {};
            // paramsExpires.userObjId = user._id;
            // paramsExpires.expiresDate = expiresDate;
            // await UsersService.updateExpiresDate(paramsExpires);
            delete user._doc.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10001,
                message: CODES_SUCCESS[10001],
                data: user,
            });
        } catch (err) {
            console.log(err, 'err')
            return res.json(err);
        }
    }
}
module.exports.AUTH = {
    update: async (req, res) => {
        try {
            const updatedUser = await UsersService.update(req.body)
            if (!isEmpty(updatedUser)) {
                return res.json(responseSuccess(10230, updatedUser));
            }
            return res.json(responseError(40130, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },
    info: async (req, res) => {
        try {
            const { id } = req.params;
            const findUser = await UsersService.findByConditions({
                userObjId: id,
            })
            if (!isEmpty(findUser)) {
                return res.json(responseSuccess(10233, findUser));
            }
            return res.json(responseError(40130, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },
}