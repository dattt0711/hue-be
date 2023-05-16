const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const ordersBase = {
    userObjId: {
        type: ObjectId, trim: true, ref: 'users',
    },
    address: {
        type: String, trim: true,
    },
    phoneNumber: {
        type: Number, trim: true,
    },
    receiverName: {
        type: String, trim: true,
    },
    totalPrice: {
        type: Number, trim: true,
    },
    productObjIds: [{
        productObjId: { type: ObjectId, trim: true, ref: "products" },
        quantity: { type: Number },
        _id: false,
    }],
    createdAt: {
        type: String, default: generatorTime(),
    }
}
const orders = { ...ordersBase, ...common };
const ordersSchema = new Schema(orders, { versionKey: false });
ordersSchema.plugin(mongoosePaginate);
const ordersModels = mongoose.model('orders', ordersSchema);
module.exports = ordersModels;