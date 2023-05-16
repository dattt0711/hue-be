const {
    users: UsersModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject,
} = require('../utils/shared');
const { IS_DELETED } = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.username = data.username;
        set.password = data.password;
        set.fullName = data.fullName;
        set.age = data.age;
        set.phoneNumber = data.phoneNumber;
        set.address = data.address;
        set.email = data.email;
        set.role = data.role;
        set.isDeleted = IS_DELETED[200];
        const result = await UsersModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const updateExpiresDate = async (data) => {
    try {
        const conditions = {
            _id: convertToObjectId(data.userObjId),
            isDeleted: IS_DELETED[200],
        };
        const set = {
            expiresDate: data.expiresDate,
        };
        const result = await UsersModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.username) {
            conditions.username = data.username;
        }
        if (data?.userObjId) {
            conditions._id = data.userObjId;
        }
        if (data?.getAll) {
            const result = await UsersModels.find(conditions);
            return promiseResolve(result);
        }
        const fields = '-password';
        const result = await UsersModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
}
const update = async (data) => {
    try {
        const conditions = {};
        conditions.isDeleted = IS_DELETED[200];
        conditions._id = convertToObjectId(data.userObjId);
        const set = {};
        set.username = data.username;
        set.password = data.password;
        set.fullName = data.fullName;
        set.age = data.age;
        set.phoneNumber = data.phoneNumber;
        set.address = data.address;
        set.email = data.email;
        set.fullName = data.fullName;
        set.sex = data.sex;
        set.dob = data.dob;
        const result = await UsersModels.findOneAndUpdate(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
module.exports = {
    create,
    findByConditions,
    updateExpiresDate,
    update,
};
