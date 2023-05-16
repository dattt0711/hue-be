const CartsService = require('../services/CartsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult, includeInArrString
} = require('../utils/shared')
// const {
//     listValidator
// } = require('../validators/CommonValidator')
// const {
//     createValidator, updateValidator, deleteValidator,
// } = require('../validators/PostsValidator')
module.exports.AUTH = {
    // detailPostById: async (req,res) => {
    //     try {
    //         const {id} = req.params
    //         const result = await postsService.findByConditions({
    //             postId: id,
    //         })
    //         if(!isEmpty(result)) {
    //             return res.json(responseSuccess(10204, result));
    //         }
    //         return res.json(responseSuccess(10204, []));
    //     } catch (err) {
    //         return res.json(responseError(40004,err));
    //     }
    // },
    list: async (req, res) => {
        try {
            const result = await CartsService.list({
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
    // listTags: async (req,res) => {
    //     try {
    //         const listPosts = await postsService.findByConditions({
    //             getAll: true,
    //         })
    //         function filterDistinct(value, index, self) {
    //             return self.indexOf(value) === index;
    //         }
    //         let allTags = listPosts.reduce((prev,curr)=>prev.concat(curr.tags),[]);
    //         allTags = allTags.filter(filterDistinct);
    //         return res.json(responseSuccess(10205, allTags));
    //     } catch (err) {
    //         return res.json(responseError(40004,err));
    //     }
    // },
    addToCart: async (req, res) => {
        try {
            // const errors = await validateResult(createValidator, req);
            // if (!isEmpty(errors)) {
            //     return res.json(responseError(40003, errors));
            // }
            const { userObjId, productObjIds } = req.body;
            let updatedCart = [];
            const existedCart = await CartsService.findByConditions({
                userObjId,
            })
            let result = [];
            const productsInCart = existedCart?.productObjIds ? existedCart?.productObjIds : [];
            if (isEmpty(existedCart)) {
                result = await CartsService.create({
                    userObjId,
                    productObjIds,
                })
            } else {
                for (let i = 0; i < productObjIds.length; i++) {
                    const indexFindProduct = productsInCart.findIndex(e => e.productObjId.toString() ===
                        productObjIds[i].productObjId.toString());
                    if (indexFindProduct >= 0) {
                        productsInCart[indexFindProduct] = {
                            ...productsInCart[indexFindProduct],
                            quantity: +productsInCart[indexFindProduct].quantity + +productObjIds[i].quantity,
                        }
                    } else {
                        productsInCart.push(productObjIds[i]);
                    }
                }
                result = await CartsService.update({
                    userObjId,
                    productObjIds: productsInCart,
                })
            }
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10210, result));
            }
            return res.json(responseError(40110, []));
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
            const findCart = await CartsService.findByConditions({
                userObjId,
            })
            if (isEmpty(findCart)) {
                return res.json(responseError(40113, []));
            }
            const updateCart = findCart.productObjIds.filter(product => product.productObjId.toString() !== productObjId);
            const result = await CartsService.update({
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