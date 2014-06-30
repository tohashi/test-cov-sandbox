var casper = require('casper').create({
    logLevel: 'info',
    verbose: true
});

casper.test.begin('.profile-wrapperが存在する', 1, function(test) {
    casper.start('http://localhost:8080').then(function() {
        test.assertExists('.profile-wrapper')
    }).run(function() {
        test.done();
    });
});
