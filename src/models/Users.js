const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ROLE } = require('../utils/constants');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;

const usersBase = {
    username: {
        type: String, trim: true,
    },
    fullName: {
        type: String, trim: true,
    },
    dob: {
        type: String, trim: true,
    },
    phone: {
        type: Number, trim: true,
    },
    password: {
        type: String, trim: true
    },
    email: {
        type: String, trim: true
    },
    wishList: [{
        type: ObjectId, trim: true, ref: 'products'
    }],
    isAdmin: {
        type: Boolean, default: false
    }
}
const users = { ...usersBase, ...common };
const UsersSchema = new Schema(users, { versionKey: false });
const UsersModels = mongoose.model('users', UsersSchema);
module.exports = UsersModels;