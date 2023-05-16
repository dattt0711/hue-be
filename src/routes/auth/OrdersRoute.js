const ordersController = require('../../controllers/OrdersController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function OrdersRoute(apiRouter) {

    apiRouter.route('/orders/create').post(ordersController.create);
    apiRouter.route('/orders/list').get(ordersController.list);

}
module.exports = OrdersRoute;