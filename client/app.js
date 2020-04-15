const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName = false;

loginForm.addEventListener('submit', event => login(event));
addMessageForm.addEventListener('submit', event => sendMessage(event));

const login = (event) => {
    event.preventDefault();
    const userNameInputValue = userNameInput.value.toString().trim();
    if(userNameInputValue != '') {
        userName = userNameInputValue;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else {
        alert('Please enter login !');
    }
};

const sendMessage = (event) => {
    event.preventDefault();
    const textInputValue = messageContentInput.value.toString();
    const textValidateValue = messageContentInput.value.toString().trim();
    if(textValidateValue != '') {
        addMessage(userName, textInputValue);
        messageContentInput.value = null; 
    } else {
        alert('Please type text !');
    }
};

const addMessage = (author, content) => {
    const message = document.createElement('li');
    message.classList.add('message', 'message--recived');
    
    author === userName ? message.classList.add('message--self') : false;

    message.innerHTML = 
    `<h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>`;
    messagesList.appendChild(message);
};