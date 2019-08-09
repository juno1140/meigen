// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

const CLASS_TYPE = {
    msg: '.placeMsg',
    psn: '.placePsn'
};
const PH_TEXT = {
    msg: '名言「126字以内」<br>※事実と異なることは入力しないでください。',
    psn: '人名「18字以内」'
}
const PH_COLOR = '#aaa'; // プレースホルダーの色
const NON_PH_COLOR = '#000'; // 通常の色
const LIMIT_NUM = {
    msg:126,
    psn:18
};
const ALERT_MSG_REQUIRE = {
    msg: '名言を入力してください',
    psn: '人名を入力してください '
};
const ALERT_MSG_LIMIT = {
    msg: '名言は126文字以内で入力してください。',
    psn: '人名は18文字以内で入力してください。 '
};

// 読み込み完了時の処理
window.onload = function() {

    // 特定のページのみ処理する
    var path  = location.pathname // ファイルパス
    var patterns = ['index', 'create']; // 特定のファイル名一覧

    // 後方一致
    for (var p of patterns) {
        if((path.lastIndexOf(p)+p.length===path.length)&&(p.length<=path.length)){
            setPlaceholder('msg');
            setPlaceholder('psn');
            return;
        }
    }

}

// テキストが空ならプレースホルダーを設定(フォーカスを外した時などの処理)
function setPlaceholder(type) {
    var text = document.querySelector(CLASS_TYPE[type]);
    if (text.textContent == '') {
        text.innerHTML = PH_TEXT[type];
        text.style.color = PH_COLOR;
    }
}

// テキストがプレースホルダーなら空にする(テキストクリック時など)
function clearText(type) {
    var msg = document.querySelector(CLASS_TYPE[type]);
    if (msg.innerHTML == PH_TEXT[type]) {
        msg.innerHTML = '';
        msg.style.color = NON_PH_COLOR;
    }
}

// 名言新規登録
function newRegist() {

    // DOM要素取得
    var msg = document.querySelector(".msg");
    var person = document.querySelector(".person");
    var btn = document.querySelector(".btn");
    
    // msg何も入力がない場合
    if (msg.innerHTML == PH_TEXT['msg']) {
        alert(ALERT_MSG_REQUIRE['msg']);
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // person何も入力がない場合
    if (person.innerHTML == PH_TEXT['psn']) {
        alert(ALERT_MSG_REQUIRE['psn']);
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // 文字数のバリデーション
    if (!checkWordCount('msg') || !checkWordCount('psn')) {
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // フォームの設定
    var form = document.createElement('form');
    var param_msg = document.createElement('input');
    var param_person = document.createElement('input');

    // value
    form.method = 'POST';
    form.action = '/posts/create';
    // メッセージの取得
    param_msg.type = 'hidden';
    param_msg.name = 'msg';
    param_msg.value = msg.textContent;
    // 人物の取得
    param_person.type = 'hidden';
    param_person.name = 'person';
    param_person.value = person.textContent;

    form.appendChild(param_msg);
    form.appendChild(param_person);

    document.body.appendChild(form);

    form.submit();
}

// 名言新規更新
function newUpdate() {

    // DOM要素取得
    var msg = document.querySelector(".msg");
    var person = document.querySelector(".person");
    var btn = document.querySelector(".btn");
    var id = document.querySelector("#id").value;

    // msg何も入力がない場合
    if (msg.innerHTML == PH_TEXT['msg']) {
        alert(ALERT_MSG_REQUIRE['msg']);
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // person何も入力がない場合
    if (person.innerHTML == PH_TEXT['psn']) {
        alert(ALERT_MSG_REQUIRE['psn']);
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // 文字数のバリデーション
    if (!checkWordCount('msg') || !checkWordCount('psn')) {
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // フォームの設定
    var form = document.createElement('form');
    var param_id = document.createElement('input');
    var param_msg = document.createElement('input');
    var param_person = document.createElement('input');

    // idの取得
    param_id.type = 'hidden';
    param_id.name = 'id';
    param_id.value = id;

    // メッセージの取得
    param_msg.type = 'hidden';
    param_msg.name = 'msg';
    param_msg.value = msg.textContent;

    // 人物の取得
    param_person.type = 'hidden';
    param_person.name = 'person';
    param_person.value = person.textContent;

    form.method = 'POST';
    form.action = '/posts/' + id + '/update';

    form.appendChild(param_id);
    form.appendChild(param_msg);
    form.appendChild(param_person);

    document.body.appendChild(form);

    form.submit();
}

// ページ遷移
function pageChange(route) {
    window.location.href = route;
}

// 文字数バリデーション
function checkWordCount(type) {
    var text = document.querySelector(CLASS_TYPE[type]).textContent;
    if (text.length > LIMIT_NUM[type]) {
        alert(ALERT_MSG[type]);
        return false;
    }
    return true;
}