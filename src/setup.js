module.exports = function() {
    global._ = require('underscore');
    global.Backbone = require('backbone');
    global.$ = Backbone.$ = require('jquery');
    global.Handlebars = require('handlebars');

    var moment = require('moment');

    Handlebars.registerHelper('formatDate', function(dateText) {
        return moment(dateText, 'YYYYMMDD').calendar();
    });
};
