const homeRouter = require('./homerouter');
require('dotenv').config()

module.exports = function (app) {
    app.use('/', homeRouter);
}