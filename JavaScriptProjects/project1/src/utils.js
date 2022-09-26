export function getUserData() {
    return JSON.parse(sessionStorage.getItem('user'));
}

export function setUserData(data) {
    sessionStorage.setItem('user', JSON.stringify(data));
}

export function creatSubmitHandler(ctx, handler) {
    return function(e) {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.target));

        handler(ctx, formData, e);
    };
}

export function clearUserData() {
    sessionStorage.removeItem('user');
}