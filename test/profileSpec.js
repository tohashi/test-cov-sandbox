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
