( function(){
    'use strict';
    const bookshelf = require('../db');

    module.exports = bookshelf.Model.extend({
        tableName:'tasks'
    });

})();