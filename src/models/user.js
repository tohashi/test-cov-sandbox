var UserModel = Backbone.Model.extend({
    defaults: {
        'name': 'user1',
        'id': 1,
        'avatarImgUrl': 'avatar.png',
        'birthday': '19700101',
        'birthplace': '東京都',
        'introduction': 'よろしくお願いします'
    },

    url: '/user',

    updateIntroduction: function(text) {
    }
});

module.exports = UserModel;
