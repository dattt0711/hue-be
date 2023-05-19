const express = require('express');
const router = express.Router();
const OrdersModel = require('../models/Orders');
const CartsModel = require('../models/Carts');
const {
    responseSuccess, responseError,
    regExpSearch, convertToObjectId,
} = require('../utils/shared');
router.post('/orders/payment', async (req, res) => {
    try {
        const { userObjId, country, city,
            district, phoneNumber, receiverName,
            totalPrice, productObjIds } = req.body;

        const set = {};
        set.country = country;
        set.city = city;
        set.district = district;
        set.phoneNumber = phoneNumber;
        set.receiverName = receiverName;
        set.totalPrice = totalPrice;
        set.productObjIds = productObjIds.map((item) => ({ ...item, productObjId: convertToObjectId(item.productObjId) }))
        const result = await OrdersModel.create(set);
        const conditionCart = {};
        conditionCart.isDeleted = 'No';
        conditionCart.userObjId = convertToObjectId(userObjId);
        const setCart = {};
        setCart.isDeleted = 'Yes';
        await CartsModel.findOneAndUpdate(conditionCart, setCart, { new: true });
        if (result) {
            return res.json(responseSuccess("Order successfully!", result));
        }
        return res.json(responseSuccess("Order fail!", []))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})

router.get('/orders/list', async (req, res) => {
    try {
        const result = await OrdersModel.find().populate('productObjIds.productObjId');
        if (result) {
            return res.json(responseSuccess("List order successfully!", result));
        }
        return res.json(responseError("List order fail", {}))
    } catch (err) {
        console.log(err, 'err')
        return res.json(responseError("Something went wrong!", err))
    }
})



module.exports = router;