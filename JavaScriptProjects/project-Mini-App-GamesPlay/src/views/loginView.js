import { html } from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../utils.js';
import * as userService from '../api/userService.js';

const loginTemplate = (submitHandler) => html`
<section id="login-page" class="auth">
    <form @submit=${submitHandler} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    await userService.login(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/');

}