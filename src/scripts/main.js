'use strict';

const body = document.querySelector('body');
const successBothClick = { left: false, right: false };

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', (e) => {
    if (e.clientX <= body.clientWidth / 2) {
      successBothClick.left = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => [
  body.addEventListener('click', (e) => {
    if (e.clientX > body.clientWidth / 2) {
      successBothClick.right = true;
    }
    resolve('Second promise was resolved');
  }),
]);

const thirdPromise = new Promise((resolve, reject) => {
  resolve('Third promise was resolved');
});

firstPromise
  .then((text) => {
    message(text, 'success');
    checkThirdPromise(thirdPromise);
  })
  .catch((error) => {
    message(error.message, 'error');
  });

secondPromise.then((text) => {
  message(text, 'success');
  checkThirdPromise(thirdPromise);
});

function message(text, value) {
  const createMessage = document.createElement('div');

  createMessage.setAttribute('data-qa', 'notification');
  createMessage.classList.add(value);
  createMessage.textContent = text;

  document.body.appendChild(createMessage);

  return createMessage;
}

function checkThirdPromise(promise) {
  if (successBothClick.right && successBothClick.left) {
    promise.then((text) => message(text, 'success'));
  }
}
