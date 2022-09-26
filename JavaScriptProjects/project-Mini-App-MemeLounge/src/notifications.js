const errorBox = document.getElementById('errorBox');
const span = errorBox.querySelector('span');

export function notify(message) {
    span.textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => errorBox.style.display = 'none', 3000);
}