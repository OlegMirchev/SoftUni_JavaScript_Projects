import * as userService from "../api/userService.js";

export function logoutView(ctx) {
    userService.logout();
    ctx.page.redirect('/');
}