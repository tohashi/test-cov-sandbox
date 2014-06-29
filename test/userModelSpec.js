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
