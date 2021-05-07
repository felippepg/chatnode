const socket = io();
let userName = '';
let userList = [];

let loginPage = document.querySelector("#loginPage");
let chatPage = document.querySelector("#chatPage");

let loginNameInput = document.querySelector('#loginNameInput');
let chatTextInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

function renderUserList() {
    let ul = document.querySelector('.userList');
    ul.innerHTML = '';

    userList.forEach(user => {
        ul.innerHTML += '<li>' + user + '</li>';
    })
}

function addMessage(type, user, msg) {
    let ul = document.querySelector('.chatList');

    switch (type) {
        case 'status':
            ul.innerHTML += '<li class="m-status">' + msg + '</li>';
            break;

        case 'msf':
            ul.innerHTML += '<li class="m-txt"><spam>' + user + '</spam>' + msg + '</li>';
            break;
    }
}

loginNameInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        let name = loginNameInput.value.trim();
        if (name != '') {
            userName = name;
            document.title = 'Chat (' + userName + ')';
            socket.emit('join-user', userName);
        }
    }
})

socket.on('user-ok', (list) => {
    loginPage.style.display = 'none';
    chatPage.style.display = 'flex';
    userList = list;

    addMessage('status', null, 'Conectado');
    renderUserList();
});

socket.on('update-users', (data) => {
    if (data.join) {
        addMessage('status', null, data.join + ' entrou no Chat.');
    };

    if (data.left) {
        addMessage('status', null, data.left + ' saiu do Chat.');
    };

    userList = data.list;

    renderUserList();
})