import {html} from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../utils.js';
import * as userService from '../api/userService.js';

const registerTemplate = (submitHandler) => html`
<section id="register">
    <div class="form">
    <h2>Register</h2>
    <form @submit=${submitHandler} class="login-form">
        <input
        type="text"
        name="email"
        id="register-email"
        placeholder="email"
        />
        <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
        />
        <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
    </div>
</section>
`;

export function registerView(ctx) {
    ctx.render(registerTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    console.log(formData['re-password']);

    if (formData.email === '' || formData.password === '') {
        return alert('Some fields is Empty!');
    }

    if (formData.password !== formData['re-password']) {
        return alert('Password don\'t match');
    }

    await userService.register(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/catalog');
}