var ProfileView = Backbone.View.extend({
    el: '.profile-wrapper',

    events: {
        'change .profile-introduction': 'onChanageIntroduciton'
    },

    initialize: function() {
        this.template = Handlebars.compile($('#profile-template').html());
        this.listenTo(this.model, 'sync', this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    },

    onChanageIntroduciton: function(e) {
        this.model.updateIntroduction($(e.currentTarget).val());
    }
});

module.exports = ProfileView;
