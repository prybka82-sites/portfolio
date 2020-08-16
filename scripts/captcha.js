
let x = 0;
let y = 0;
let captcha_question;
let captcha_answer;
let captcha_possibilityA;
let captcha_possibilityB;
let captcha_possibilityC;

const captcha_question_label = document.querySelector('#captcha_question_label');
const captcha_buttonA = document.querySelector('#captcha_button_A');
const captcha_buttonB = document.querySelector('#captcha_button_B');
const captcha_buttonC = document.querySelector('#captcha_button_C');

const captcha_ok = document.querySelector('#captcha_validation_ok')
const captcha_nok = document.querySelector('#captcha_validation_nok')

const sendBtn = document.querySelector('#sendMail');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function rand() {
    return getRndInteger(0, 6);
}

function prepareCaptcha() {
    x = rand();
    y = rand();
    captcha_possibilityA = rand();
    captcha_possibilityB = rand();
    captcha_possibilityC = rand();

    captcha_question = `What is the sum of ${x} and ${y}?`;
    captcha_answer = (x + y).toString();

    let temp = getRndInteger(1, 3);
    if (temp === 1) captcha_possibilityA = x + y;
    if (temp === 2) captcha_possibilityB = x + y;
    if (temp === 3) captcha_possibilityC = x + y;

    captcha_question_label.textContent = captcha_question;
    captcha_buttonA.value = captcha_possibilityA;
    captcha_buttonB.value = captcha_possibilityB;
    captcha_buttonC.value = captcha_possibilityC;


}

function validateCaptcha(e) {
    let btn = e.target;
    let ans = btn.value;

    if (ans === captcha_answer) {
        captcha_ok.classList.remove('hidden');

        sendBtn.disabled = false;
        sendBtn.classList.remove('disabled');
    } else {
        captcha_nok.classList.remove('hidden');
    }

    captcha_buttonA.classList.add('hidden');
    captcha_buttonB.classList.add('hidden');
    captcha_buttonC.classList.add('hidden');


}


window.addEventListener('load', prepareCaptcha);
captcha_buttonA.addEventListener('click', validateCaptcha);
captcha_buttonB.addEventListener('click', validateCaptcha);
captcha_buttonC.addEventListener('click', validateCaptcha);
