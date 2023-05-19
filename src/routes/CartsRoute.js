const express = require('express');
const router = express.Router();
const CartsModel = require('../models/Carts');
const {
    responseSuccess, responseError,
    regExpSearch, convertToObjectId,
    isEmpty,
} = require('../utils/shared');
router.post('/carts/addToCart', async (req, res) => {
    try {
        const { userObjId, productObjIds } = req.body;
        let updatedCart = [];
        const conditions = {
            isDeleted: 'No',
            userObjId: convertToObjectId(userObjId),
        }
        const existedCart = await CartsModel.findOne(conditions);
        let result = [];
        const productsInCart = existedCart?.productObjIds ? existedCart?.productObjIds : [];
        if (isEmpty(existedCart)) {
            result = await CartsModel.create({
                userObjId,
                productObjIds,
            })
        } else {
            for (let i = 0; i < productObjIds.length; i++) {
                const indexFindProduct = productsInCart.findIndex(e => e?.productObjId?.toString() ===
                    productObjIds[i]?.productObjId?.toString());
                console
                if (indexFindProduct >= 0) {
                    productsInCart[indexFindProduct] = {
                        productObjId: convertToObjectId(productsInCart[indexFindProduct].productObjId),
                        quantity: +productsInCart[indexFindProduct].quantity + +productObjIds[i].quantity,
                    }
                } else {
                    productsInCart.push(productObjIds[i]);
                }
            }
            result = await CartsModel.findOneAndUpdate(conditions, { productObjIds: productsInCart }, { new: true });
        }
        if (result) {
            return res.json(responseSuccess("Add to cart successfully!", result));
        }
        return res.json(responseError("Add to cart fail!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.get('/carts/list', async (req, res) => {
    try {
        const { userObjId } = req.query;
        const conditions = {
            isDeleted: 'No',

            userObjId: convertToObjectId(userObjId),
        }
        const result = await CartsModel.findOne(conditions).populate('productObjIds.productObjId');
        if (result) {
            return res.json(responseSuccess("list carts successfully!", result));
        }
        return res.json(responseError("list carts fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})



module.exports = router;