import {html} from '../../node_modules/lit-html/lit-html.js';
import * as userService from '../api/userService.js';
import { notify } from '../notifications.js';
import { creatSubmitHandler } from '../util.js';

const loginTemplate = (submitHandler) => html`
<section id="login">
    <form @submit=${submitHandler} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`;

export function loginView(ctx) {
    ctx.render(loginTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (formData.email === '' || formData.password === '') {
       return notify('Some fields is Empty!');
    }

    await userService.login(formData.email, formData.password);

    e.target.reset();

    ctx.page.redirect('/catalog');

}