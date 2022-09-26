import * as userService from '../api/userService.js';

export function logout(ctx) {
    userService.logout();
    ctx.page.redirect('/catalog');
}