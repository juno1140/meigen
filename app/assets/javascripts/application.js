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


const M_PLACEHOLDER = '名言「126字以内」<br>※事実と異なることは入力しないでください。';
const P_PLACEHOLDER = '人名「18字以内」';
const PH_COLOR = '#aaa';
const NON_PH_COLOR = '#000';

// 読み込み完了時の処理
window.onload = function() {

    // 特定のページのみ処理する
    var path  = location.pathname // ファイルパス
    var patterns = ['index', 'create']; // 特定のファイル名一覧

    // 後方一致
    for (var p of patterns) {
        if((path.lastIndexOf(p)+p.length===path.length)&&(p.length<=path.length)){
            setPlaceholder();
            return;
        }
    }

}

// プレースホルダーの設定
function setPlaceholder (){

    var msg = document.querySelector(".placeMsg");
    var person = document.querySelector(".placePsn");

    msg.innerHTML = M_PLACEHOLDER;
    msg.style.color = PH_COLOR;
    person.innerHTML = P_PLACEHOLDER;
    person.style.color = PH_COLOR;

}

// placeMsgの内容がプレースホルダーなら空にする(テキストクリック時他)
function clearMsg() {
    var msg = document.querySelector(".placeMsg");
    if (msg.innerHTML == M_PLACEHOLDER) {
        msg.innerHTML = '';
        msg.style.color = NON_PH_COLOR;
    }
}

// placePsnの内容がプレースホルダーなら空にする(テキストクリック時他)
function clearPsn() {
    var msg = document.querySelector(".placePsn");
    if (msg.innerHTML == P_PLACEHOLDER) {
        msg.innerHTML = '';
        msg.style.color = NON_PH_COLOR;
    }
}

// placeMsgの内容が空ならプレースホルダーを設定する(フォーカスを外した時の処理)
function checkMsg() {
    var msg = document.querySelector(".placeMsg");
    if (msg.innerHTML == '') {
        msg.innerHTML = M_PLACEHOLDER;
        msg.style.color = PH_COLOR;
    }
}

// placePsnの内容が空ならプレースホルダーを設定する(フォーカスを外した時の処理)
function checkPsn() {
    var msg = document.querySelector(".placePsn");
    if (msg.innerHTML == '') {
        msg.innerHTML = P_PLACEHOLDER;
        msg.style.color = PH_COLOR;
    }
}


// 名言新規登録
function newRegist() {

    // DOM要素取得
    var msg = document.querySelector(".msg");
    var person = document.querySelector(".person");
    var btn = document.querySelector(".btn");
    
//     console.log(msg.innerText);
//     console.log(msg.innerHTML);
//     console.log(msg.textContent);
//     btn.disabled = false; // ボタンの操作を可能にする
// return
    
    // msg何も入力がない場合
    if (msg.innerHTML == M_PLACEHOLDER) {
        alert('名言を入力してください');
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // person何も入力がない場合
    if (person.innerHTML == P_PLACEHOLDER) {
        alert('人名を入力してください');
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // 文字数のバリデーション
    if (!checkWordCount('0') || !checkWordCount('1')) {
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
    if (msg.innerHTML == M_PLACEHOLDER) {
        alert('名言を入力してください');
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // person何も入力がない場合
    if (person.innerHTML == P_PLACEHOLDER) {
        alert('人名を入力してください');
        btn.disabled = false; // ボタンの操作を可能にする
        return;
    }

    // 文字数のバリデーション
    if (!checkWordCount('0') || !checkWordCount('1')) {
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

// 文字数チェック
const ele = [
    [".placeMsg", "126", "名言は126文字以内で入力してください。"], // placeMsgの文字数制限
    [".placePsn", "18","人名は18文字以内で入力してください。"]     // placePsnの文字数制限
];

// placeMsgの文字数バリエーション
function checkWordCount(type) {
    var text = document.querySelector(ele[type][0]).innerText;
    if (text.length > ele[type][1]) {
        alert(ele[type][2]);
        return false;
    }
    return true;
}