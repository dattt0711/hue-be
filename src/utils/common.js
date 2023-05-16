const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const { generatorTime, responseError } = require('./shared');
const configJwt = require('../configs/configJWT');
module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers['x-access-token'] || req.body.token || req.query.token;
            if (!token) {
                return res.json(responseError(40001));
            }
            jwt.verify(token, configJwt.secret, async (err, decoded) => {
                if (err) {
                    return res.json(responseError(40002));
                }
                return next();
            });
        } catch (errors) {
            if (errors.name === 'JsonWebTokenError') {
                return res.json(responseError(40002, errors));
            }
            return res.json(responseError(40002, errors));
        }
    },
}