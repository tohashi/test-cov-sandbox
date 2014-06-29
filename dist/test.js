(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
module.exports = function() {
    describe('ユーザープロフィール画面', function() {
        it('ユーザー名を表示する');
        it('アバターを表示する');
        it('生年月日を表示する');
        it('出身地を表示する');
        it('自己紹介文を表示する');

        describe('Twitterアカウント未登録の場合', function() {
            it('Twitterアカウント登録画面への導線を出す');
        });
    });
};

},{}],4:[function(require,module,exports){
module.exports = function() {
    describe('ProfileView', function() {
        var ProfileView = require('../src/views/profile');
        var UserModel = require('../src/models/user');


        describe('modelのsyncイベント発火時', function() {
            it('renderを呼び出す', function() {
                var profileView = new ProfileView({
                    model: new UserModel
                });
                var stub = sinon.stub(profileView, 'render');
                profileView.model.trigger('sync');
                profileView.render();

                expect(stub).to.have.been.calledOnce;
                stub.restore();
            });
        });

        describe('render', function() {
            it('.profile-wrapper内にテンプレートを展開する', function() {
                var profileView = new ProfileView({
                    model: new UserModel
                });
                profileView.render();
                expect(profileView.$el.find('.profile-name')).to.have.length(1);
            });
        });
    });
};

},{"../src/models/user":1,"../src/views/profile":2}],5:[function(require,module,exports){
(function (global){
global.expect = chai.expect;

mocha.setup({
    ui: 'bdd'
});

var fakeXhr = sinon.useFakeXMLHttpRequest();
global.requests = [];


fakeXhr.onCreate = function(xhr) {
    requests.push(xhr);
};

afterEach(function() {
    requests.splice(0, requests.length);
});

require('./userModelSpec')();
require('./profileViewSpec')();
require('./profileSpec');

if (global.mochaPhantomJS) {
    mochaPhantomJS.run();
} else {
    mocha.run();
}

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./profileSpec":3,"./profileViewSpec":4,"./userModelSpec":6}],6:[function(require,module,exports){
(function (global){
module.exports = function() {
    describe('UserModel', function() {
        var UserModel = require('../src/models/user');

        describe('fetch', function() {
            it('/userにGETでリクエストを送る', function() {
                var stub = sinon.stub(global.Backbone.$, 'ajax');
                var userModel = new UserModel();
                userModel.fetch();
                expect(stub).to.have.been.called;
                var options = stub.getCall(0).args[0];
                expect(options.type).to.equal('GET');
                expect(options.url).to.equal('/user');
                stub.restore();
            });

            describe('リクエスト成功時', function() {
                it('レスポンスの値を自身に保存する', function() {
                    var userModel = new UserModel();
                    var dummyData = {
                        'name': 'test',
                        'id': 123,
                        'avatarImgUrl': 'avatar_123.png',
                        'birthday': '2014/07/01',
                        'birthplace': '北海道',
                        'introduction': 'Hello'
                    };

                    userModel.fetch();
                    requests[0].respond(200, {}, JSON.stringify(dummyData));
                    expect(userModel.toJSON()).to.deep.equal(dummyData);
                });
            });
        });
    });
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/models/user":1}]},{},[5])