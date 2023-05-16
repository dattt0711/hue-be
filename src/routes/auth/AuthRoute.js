
const express = require('express');

const authRouter = express.Router();
const {
    verifyToken,
} = require('../../utils/common.js');

// authRouter.use(async (req, res, next) => {
//     await verifyToken(req, res, next);
// });
require('./ProductsRoute')(authRouter);
require('./CartsRoute')(authRouter);
require('./OrdersRoute')(authRouter);
require('./UsersRoute')(authRouter);
require('./CommentsRoute')(authRouter);

module.exports = authRouter;
