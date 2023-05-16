const CommentsService = require('../services/CommentsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult, includeInArrString
} = require('../utils/shared')

module.exports.AUTH = {
    list: async (req, res) => {
        try {
            const { productObjId } = req.query;
            const result = await CommentsService.findByConditions({
                getAll: true,
                productObjId,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10242, result));
            }
            return res.json(responseSuccess(10242, []));
        } catch (err) {
            console.log(err, 'err')
            return res.json(responseError(40004, err));
        }
    },
    create: async (req, res) => {
        try {
            const result = await CommentsService.create(req.body);
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10241, result));
            }
            return res.json(responseError(40141, []));
        } catch (err) {
            console.log(err, 'err')
            return res.json(responseError(40004, err));
        }
    },
}