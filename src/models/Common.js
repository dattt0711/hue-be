
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const {
    IS_DELETED,
} = require('../utils/constants');


const common = {
    isDeleted: {type: String, default: IS_DELETED[200], index: true},
};
module.exports = {
    common,
};
