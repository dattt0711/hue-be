const sanitize = require('mongo-sanitize');
const { check, validationResult } = require('express-validator');
const moment = require('moment-timezone');
const generatorTime = () => moment().format('YYYY-MM-DD HH:mm:ss');
const empty = require('is-empty');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { CODES_SUCCESS, CODES_ERROR } = require('./messages');
const { IS_DELETED } = require('./constants');
const isValidDate = (date, formatDate = '') => {
    let isValidDate = false;
    if (formatDate !== '') {
        isValidDate = moment(date, formatDate, true).isValid();
    } else {
        isValidDate = moment(date).isValid();
    }
    return isValidDate;
};
const responseError = (message, errors = {}) => {
    const response = {};
    response.success = false;
    response.message = message;

    return response;
};
const responseSuccess = (message, result = {}) => {
    const response = {
        success: true,
        message,
    };
    if (result) {
        response.data = result;
    }
    return response;
};
const connectDatabase = (databaseName) => {
    const conn = mongoose.dbs[databaseName];
    return conn;
};
const convertToObjectId = (value) => ObjectId(sanitizeFieldName(value));
const sanitizeFieldName = (fieldName) => { // Injection
    if (fieldName) {
        return sanitize(fieldName);
    }
    return '';
};

const populateModel = (path, select = {}, match = {}, option = {}) => {
    const populate = {
        path: path,
        select: select,
        match: { isDeleted: IS_DELETED[200], ...match },
    };
    if (!isEmpty(option)) {
        populate.options = { ...option };
    }
    return populate;
};
const isEmpty = (value) => empty(value);
const promiseResolve = (data) => Promise.resolve(data);
const promiseReject = (err) => Promise.reject(err);
const escapeRegExp = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regExpSearch = (string = '') => {
    const regex = new RegExp(escapeRegExp(string), 'i');
    return regex;
};
const validateObjectId = (field, required = false) => {
    if (required) {
        return check([field]).notEmpty().withMessage(`${field} is required`)
            .isMongoId()
            .withMessage(`${field} must is ObjectId`);
    }
    return check([field])
        .optional({ nullable: true }).isMongoId().withMessage(`${field} must is ObjectId or null`);
};
const includeInArrString = (arr, item) => {
    const tempArr = arr.map((ar) => ar.toString());
    return tempArr.includes(item.toString());
}
module.exports = {
    generatorTime,
    responseSuccess,
    responseError,
    connectDatabase,
    convertToObjectId,
    populateModel,
    promiseResolve,
    promiseReject,
    isEmpty,
    escapeRegExp,
    regExpSearch,
    validateObjectId,
    isValidDate,
    includeInArrString,
}

