const cartsController = require('../../controllers/CartsController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function CartsRoute(apiRouter) {
    // Create a new product
    apiRouter.route('/carts/addToCart').post(cartsController.addToCart);
    apiRouter.route('/carts/list').get(cartsController.list);
    apiRouter.route('/carts/delete').delete(cartsController.delete);

}
module.exports = CartsRoute;