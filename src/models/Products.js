const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const productsBase = {
    productName: {
        type: String, trim: true,
    },
    category: {
        type: String, trim: true,
    },
    description: {
        type: String, trim: true,
    },
    price: {
        type: Number, trim: true,
    },
    image: {
        type: String, trim: true,
    },
    details: {
        type: String, trim: true,
    },
    subImage1: {
        type: String, trim: true,
    },
    subImage2: {
        type: String, trim: true,
    },
    subImage3: {
        type: String, trim: true,
    },
}
const products = { ...productsBase, ...common };
const productsSchema = new Schema(products, { versionKey: false });
productsSchema.plugin(mongoosePaginate);
const productsModels = mongoose.model('products', productsSchema);
module.exports = productsModels;