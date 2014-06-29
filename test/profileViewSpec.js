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
