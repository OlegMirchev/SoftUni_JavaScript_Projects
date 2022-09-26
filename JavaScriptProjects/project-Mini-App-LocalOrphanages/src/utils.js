export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function setUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function creatSubmitHandler(ctx, handler) {
    return function(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        handler(ctx, formData, e);
    };
}

export function clearUserData() {
    localStorage.removeItem('user');
}