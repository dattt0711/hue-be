const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const ordersBase = {

    country: {
        type: String, trim: true,
    },
    city: {
        type: String, trim: true,
    },
    district: {
        type: String, trim: true,
    },
    phoneNumber: {
        type: String, trim: true,
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