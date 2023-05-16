const usersController = require('../../controllers/UsersController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function UsersRoute(apiRouter) {

    apiRouter.route('/users/update').put(usersController.update);
    apiRouter.route('/users/info/:id').get(usersController.info);

}
module.exports = UsersRoute;