import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const textArea = document.querySelector('textarea');
const email = document.querySelector('input');
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

form.addEventListener('submit', onFormSubmit);
textArea.addEventListener('input', throttle(onTextAreaInput, 500));

form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
    });

fillInTextarea();

// Сохраняем введенные данные в localStorage

function onTextAreaInput(e) {
    formData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        email: email.value,
        message: textArea.value,
    }));
}

// Заполнить поле формы из localStorage

function fillInTextarea() {

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedData) {
        email.value = savedData.email;
        textArea.value = savedData.message;
    };
}

// Отправляем сообщение, очищаем форму, очищаем localStorage

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.target.reset();
    localStorage.removeItem(STORAGE_KEY);
}
