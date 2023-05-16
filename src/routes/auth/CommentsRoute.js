const commentsController = require('../../controllers/CommentsController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function CartsRoute(apiRouter) {
    apiRouter.route('/comments/create').post(commentsController.create);
    apiRouter.route('/comments/list').get(commentsController.list);
}
module.exports = CartsRoute;