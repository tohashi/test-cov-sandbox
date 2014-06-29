require('./setup')();

if (global.mocha) {
    return;
}

var UserModel = require('./models/user');
var ProfileView = require('./views/profile');

var userModel = new UserModel();
var profileView = new ProfileView({
    model: userModel
});

//userModel.fetch();
userModel.trigger('sync');
