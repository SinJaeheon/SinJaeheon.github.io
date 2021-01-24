const form = document.querySelector(".js-form");
const inputPage = document.querySelector(".nameInputPage")
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const clock = document.querySelector("h1");
const main = document.querySelector(".center");

const USER_LS = "currentUser";
const SHOWING_CN ="showing";

function paintGreeting(text) {
    inputPage.classList.remove(SHOWING_CN);
    main.classList.add(SHOWING_CN);
    window.onload = function() {
        greeting.innerText = `${parseInt(clock.innerText.substring(0,2)) < 12 ? `Good morning, ${text}.` 
            : parseInt(clock.innerText.substring(0,2)) >= 12 || parseInt(clock.innerText.substring(0,2)) <= 17 ? `Good afternoon, ${text}.`
            : `Good evening, ${text}.` }`;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    localStorage.setItem(USER_LS, currentValue);
    loadName();
} 

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        inputPage.classList.add(SHOWING_CN);
        form.addEventListener("submit", handleSubmit);
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();