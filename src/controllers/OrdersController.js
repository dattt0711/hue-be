const OrdersService = require('../services/OrdersService');
const CartsService = require('../services/CartsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult, includeInArrString
} = require('../utils/shared')

module.exports.AUTH = {
    list: async (req, res) => {
        try {
            const result = await OrdersService.list({
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
            const { userObjId, productObjIds } = req.body;
            await CartsService.update({
                userObjId,
                productObjIds: [],
            })
            if (productObjIds.length === 0) return res.json(responseError(40121));
            const result = await OrdersService.create(req.body);
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10220, result));
            }
            return res.json(responseError(40120, []));
        } catch (err) {
            console.log(err, 'err')
            return res.json(responseError(40004, err));
        }
    },
    // update: async (req,res) => {
    //     try {
    //         const errors = await validateResult(updateValidator, req);
    //         if (!isEmpty(errors)) {
    //             return res.json(responseError(40003, errors));
    //         }
    //         const {title, content, postId, tags, thumbnail} = req.body;
    //         const findPost = await postsService.findByConditions({
    //             postId,
    //         })
    //         if(isEmpty(findPost)) {
    //             return res.json(responseError(40103, []));
    //         }
    //         const result = await postsService.update({
    //             postId,
    //             title,
    //             content,
    //             tags,
    //             thumbnail,
    //         })
    //         if(!isEmpty(result)) {
    //             return res.json(responseSuccess(10201, result));
    //         }
    //         return res.json(responseError(40101, []));
    //     } catch (err) {
    //         return res.json(responseError(40004,err));
    //     }
    // },
    delete: async (req, res) => {
        try {
            const { userObjId, productObjId } = req.body;
            const findCart = await OrdersService.findByConditions({
                userObjId,
            })
            if (isEmpty(findCart)) {
                return res.json(responseError(40113, []));
            }
            const updateCart = findCart.productObjIds.filter(product => product.productObjId.toString() !== productObjId);
            const result = await OrdersService.update({
                userObjId,
                productObjIds: updateCart,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10212, result));
            }
            return res.json(responseError(40112, []));
        } catch (err) {
            return res.json(responseError(40004, err));
        }
    }
}