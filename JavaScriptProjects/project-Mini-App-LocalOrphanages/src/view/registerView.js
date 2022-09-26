import { html } from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../utils.js';
import * as userService from '../api/userService.js';

const registerTemplate = (submitHandler) => html`
<section id="register-page" class="auth">
    <form @submit=${submitHandler} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>
`;

export function registerView(ctx) {
    ctx.render(registerTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (formData.email === '' || formData.password === '') {
        return alert('Some field is Empty!');
    }

    if (formData.password !== formData.repeatPassword) {
        return alert('Password don\'t match!');
    }

    await userService.register(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/catalog');
}