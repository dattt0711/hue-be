const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const { common } = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const commentsBase = {
    comment: {
        type: String, trim: true,
    },
    // userObjId: {
    //     type: ObjectId, trim: true, ref: 'users'
    // },
    brief: {
        type: String, trim: true,
    },
    rating: {
        type: Number, trim: true,
    },
    productObjId: {
        type: ObjectId, trim: true, ref: 'products'
    },
    createdAt: {
        type: String, default: generatorTime()
    }
}
const comments = { ...commentsBase, ...common };
const commentsSchema = new Schema(comments, { versionKey: false });
commentsSchema.plugin(mongoosePaginate);
const commentsModels = mongoose.model('comments', commentsSchema);
module.exports = commentsModels;