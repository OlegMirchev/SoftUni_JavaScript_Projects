import {html} from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../api/userService.js';
import { creatSubmitHandler } from '../utils.js';

const loginTemplate = (submitHandler) => html`
<section id="login">
    <div class="form">
    <h2>Login</h2>
    <form @submit=${submitHandler} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
        Not registered? <a href="/register">Create an account</a>
        </p>
    </form>
    </div>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (formData.email === '' || formData.password === '') {
       return alert('Some fields is Empty!');
    }

    await userService.login(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/catalog');

}