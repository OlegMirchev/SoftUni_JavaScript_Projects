import { html } from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../utils.js';
import * as userService from '../api/userService.js';

const loginTemplate = (submitHandler) => html`
<section id="login-page" class="auth">
    <form @submit=${submitHandler} id="login">
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (formData.email === '' || formData.password === '') {
        return alert('Some field is Empty!');
    }

    await userService.login(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/catalog');
}