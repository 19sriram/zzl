'use strict';

module.exports = function(app) {
    app.use('/api/auth', require('../controller/auth'));
    app.use('/api/user/', require('../controller/users'));
 //   app.use('/api/role/', require('../controller/roles'));

   // app.use('/api/role/', require('../controller/roles'));
}