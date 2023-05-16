const ProductsService = require('../services/ProductsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult,
} = require('../utils/shared')

module.exports.AUTH = {

    list: async (req, res) => {
        try {
            const result = await ProductsService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10203, result));
            }
            return res.json(responseSuccess(10203, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },

    create: async (req, res) => {
        try {
            const { productName, image, description, price, category } = req.body;
            const newProduct = await ProductsService.create({
                productName,
                image,
                description,
                price,
                category,
            })
            if (!isEmpty(newProduct)) {
                return res.json(responseSuccess(10200, newProduct));
            }
            return res.json(responseError(40100, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },
    info: async (req, res) => {
        try {
            const { id } = req.params;
            const findProduct = await ProductsService.findByConditions({
                productObjId: id,
            });
            if (!isEmpty(findProduct)) {
                return res.json(responseSuccess(10204, findProduct));
            }
            return res.json(responseError(40103, {}));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },
    update: async (req, res) => {
        try {

            const { productName, category, description, price, productObjId } = req.body;

            const result = await ProductsService.update({
                productName,
                category,
                description,
                price,
                productObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10201, result));
            }
            return res.json(responseError(40101, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    },
    delete: async (req, res) => {
        try {
            const { productObjId } = req.body;
            const findProduct = await ProductsService.findByConditions({
                productObjId,
            })
            if (isEmpty(findProduct)) {
                return res.json(responseError(40103, []));
            }
            const result = await ProductsService.updateDelete({
                productObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10202, result));
            }
            return res.json(responseError(40102, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    }
}