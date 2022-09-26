import * as authService from '../services/authService.js';

export const authMiddleWares = (ctx, next) => {
    ctx.user = authService.getUser();

    next();
};