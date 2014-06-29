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
require('./profileSpec')();

if (global.mochaPhantomJS) {
    mochaPhantomJS.run();
} else {
    mocha.run();
}
