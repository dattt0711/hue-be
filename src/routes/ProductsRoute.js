const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/Products');
const {
    responseSuccess, responseError,
    regExpSearch, convertToObjectId
} = require('../utils/shared');
router.get('/products/list', async (req, res) => {
    try {
        const { search, sort } = req.query;
        const conditions = {
            isDeleted: "No"
        };
        conditions.$or = [
            { productName: regExpSearch(search) },
        ]
        const sortFilter = {};
        if (sort) {
            if (+sort === 1) sortFilter.price = -1;
            if (+sort === 2) sortFilter.price = 1;
        }
        const result = await ProductsModel.find(conditions).sort(sortFilter);
        if (result) {
            return res.json(responseSuccess("List product successfully!", result));
        }
        return res.json(responseSuccess("List product successfully!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})
// related list
router.get('/products/relatedList', async (req, res) => {
    try {
        const { page = 1, category } = req.query;
        const limit = 4;
        const conditions = {
            isDeleted: "No",
        };
        if (category) {
            conditions.category = regExpSearch(category);
        }
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
        const populate = [];
        const options = {
            sort: {
                createdAt: -1,
            },
            page: page,
            limit: limit,
            lean: true,
            populate,
            // select: fields,
            customLabels: myCustomLabels,
        };
        const result = await ProductsModel.paginate(conditions, options);
        if (result) {
            return res.json(responseSuccess("List product successfully!", result));
        }
        return res.json(responseSuccess("List product successfully!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.get('/products/info/:productObjId', async (req, res) => {
    try {
        const { productObjId } = req.params;
        const conditions = {
            _id: convertToObjectId(productObjId),
        }
        const result = await ProductsModel.findOne(conditions);
        if (result) {
            return res.json(responseSuccess("Find a product successfully!", result));
        }
        return res.json(responseError("Find a product fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})
router.post('/products/create', async (req, res) => {
    try {
        const { productName, description, category,
            price, image, details, subImage1, subImage2, subImage3 } = req.body;
        const set = {};
        set.productName = productName;
        set.description = description;
        set.category = category;
        set.price = price;
        set.image = image;
        set.details = details;
        set.subImage1 = subImage1;
        set.subImage2 = subImage2;
        set.subImage3 = subImage3;
        const result = await ProductsModel.create(set);
        if (result) {
            return res.json(responseSuccess("Create a product successfully!", result));
        }
        return res.json(responseError("Create a product fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.put('/products/edit', async (req, res) => {
    try {
        const { productName, description, category, productObjId,
            price, image, details, subImage1, subImage2, subImage3 } = req.body;
        const set = {};
        const conditions = {
            _id: convertToObjectId(productObjId),
        }
        if (productName) {
            set.productName = productName;
        }
        if (description) {
            set.description = description;
        }
        if (category) {
            set.category = category;
        }
        if (price) {
            set.price = price;
        }
        if (image) {
            set.image = image;
        }
        if (details) {
            set.details = details;
        }
        if (subImage1) {
            set.subImage1 = subImage1;
        }
        if (subImage2) {
            set.subImage2 = subImage2;
        }
        if (subImage3) {
            set.subImage3 = subImage3;
        }
        const result = await ProductsModel.findOneAndUpdate(conditions, set, { new: true });
        if (result) {
            return res.json(responseSuccess("Edit a product successfully!", result));
        }
        return res.json(responseError("Edit a product fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.delete('/products/delete', async (req, res) => {
    try {
        const { productObjId } = req.body;
        const conditions = {
            _id: convertToObjectId(productObjId),
        }
        const set = {
            isDeleted: "Yes",
        }
        const result = await ProductsModel.findOneAndUpdate(conditions, set, { new: true });
        if (result) {
            return res.json(responseSuccess("Delete a product successfully!", result));
        }
        return res.json(responseError("Delete a product fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

module.exports = router;