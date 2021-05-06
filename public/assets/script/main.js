const socket = io();
let userName = '';
let userList = [];

let loginPage = document.querySelector("#loginPage");
let chatPage = document.querySelector("#chatPage");

let loginNameInput = document.querySelector('#loginNameInput');
let chatTextInput = document.querySelector('#chatTextInput');

loginPage.style.display = 'flex';
chatPage.style.display = 'none';

loginNameInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        let name = loginNameInput.value.trim();
        if (name != '') {
            userName = name;
            document.title = 'Chat (' + userName + ')';
        }
    }
})