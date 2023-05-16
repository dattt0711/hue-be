const {
    carts: CartsModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, generatorTime, convertToObjectId, promiseReject,
    populateModel, isEmpty, regExpSearch,
} = require('../utils/shared');
const { IS_DELETED, DEFAULT_PAGE, DEFAULT_LIMIT } = require('../utils/constants');
const list = async (data) => {
    try {
        const search = data.search ? data.search : '';
        const category = data.category ? data.category : '';
        const page = data.page ? data.page : DEFAULT_PAGE;
        const limit = 100;
        const sortKey = data.sortKey ? data.sortKey : 'title';
        const sortOrder = data.sortOrder ? data.sortOrder : 1;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data?.userObjId)
        }
        // if (search) {
        //     const regex = regExpSearch(search);
        //     conditions.productName = regex;
        // }
        // if (category && category !== 'All') {
        //     conditions.category = category;
        // }
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'items',
            limit: 'limit',
            page: 'currentPage',
            nextPage: 'nextPage',
            prevPage: 'prevPage',
            totalPages: 'pageCount',
            pagingCounter: 'pagingCounter',
            meta: 'paginator',
        };
        const fields = '-order -isDeleted';
        const populate = [
            populateModel('productObjIds.productObjId'),
            populateModel('userObjId', '-password'),
        ];
        const options = {
            sort: {
                [sortKey]: sortOrder,
            },
            page: page,
            limit: limit,
            lean: true,
            populate,
            select: fields,
            customLabels: myCustomLabels,
        };
        const result = CartsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const create = async (data) => {
    try {
        const set = {};
        set.userObjId = convertToObjectId(data.userObjId);
        set.productObjIds = data.productObjIds;
        set.isDeleted = IS_DELETED[200];
        console.log(set, 'set')
        const result = await CartsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const update = async (data) => {
    try {
        const set = {};
        const conditions = {
            isDeleted: IS_DELETED[200],
        };

        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        if (data?.productObjIds) {
            set.productObjIds = data.productObjIds;
        }
        const result = await CartsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err');
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if (!isEmpty(data?.userObjId)) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        conditions.isDeleted = IS_DELETED[200];
        const populate = [
            // populateModel('userObjId', '-password -expiresDate'),
        ];
        if (data?.getAll) {
            const result = await CartsModels.find(conditions).populate(populate);
            return promiseResolve(result);
        }
        const result = await CartsModels.findOne(conditions).populate(populate).lean();
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err')
        return promiseReject(err);
    }
};
const deleteConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.postId) {
            conditions._id = convertToObjectId(data.postId);
        }
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await CartsModels.updateMany(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {};
        if (data?.postId) {
            conditions._id = convertToObjectId(data.postId);
        }
        if (data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await CartsModels.findOneAndUpdate(conditions, set, { new: true });
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    create,
    update,
    findByConditions,
    deleteConditions,
    updateDelete,
    list,
};
