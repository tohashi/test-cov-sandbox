module.exports = function() {
    var UserModel = require('../src/models/user');
    var ProfileView = require('../src/views/profile');
    var userModel, profileView;

    var dummyData = {
        'name': 'テスト',
        'id': 123,
        'avatarImgUrl': 'avatar_123.png',
        'birthday': '20140701',
        'birthplace': '北海道',
        'introduction': 'Hello',
        'twitter': false
    };
    var moment = require('moment');

    beforeEach(function() {
        userModel = new UserModel();
        profileView = new ProfileView({
            model: userModel
        });
        userModel.set(dummyData);
        profileView.render();

        //userModel.fetch();
        //requests[0].respond(200, {}, JSON.stringify(dummyData));
    });

    describe('ユーザープロフィール画面', function() {
        it('ユーザー名を表示する', function() {
            expect($('.profile-name').text()).to.equal(dummyData.name);
        });
        it('アバターを表示する', function() {
            expect($('.profile-avatar').attr('src')).to.equal(dummyData.avatarImgUrl);
        });
        it('生年月日を表示する', function() {
            expect($('.profile-birthday').text()).to.equal(moment(dummyData.birthday, 'YYYYMMDD').calendar());
        });
        it('出身地を表示する', function() {
            expect($('.profile-birthplace').text()).to.equal(dummyData.birthplace);
        });
        it('自己紹介文を表示する', function() {
            expect($('.profile-introduction').text()).to.equal(dummyData.introduction);
        });

        describe('Twitterアカウント未登録の場合', function() {
            it('Twitterアカウント登録画面への導線を出す', function() {
                expect($('.profile-twitter-registration')).to.have.length(1);
                userModel.set('twitter', true);
                profileView.render();
                expect($('.profile-twitter-registration')).not.to.have.length(1);
            });
        });
    });
};
