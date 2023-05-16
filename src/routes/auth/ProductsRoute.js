const productsController = require('../../controllers/ProductsController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function ProductsRoute(apiRouter) {
    // Create a new product
    apiRouter.route('/products/create').post(productsController.create);
    apiRouter.route('/products/update').put(productsController.update);
    // apiRouter.route('/products/delete').delete(productsController.delete);
    apiRouter.route('/products/info/:id').get(productsController.info);
    apiRouter.route('/products/list').get(productsController.list);

}
module.exports = ProductsRoute;