const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const cartsBase = {
    userObjId: {
        type: ObjectId, trim: true, ref: 'users',
    },
    productObjIds: [{
        productObjId: { type: ObjectId, trim: true, ref: "products" },
        quantity: { type: Number },
        _id: false,
    }],
}
const carts = { ...cartsBase, ...common };
const cartsSchema = new Schema(carts, { versionKey: false });
cartsSchema.plugin(mongoosePaginate);
const cartsModels = mongoose.model('carts', cartsSchema);
module.exports = cartsModels;