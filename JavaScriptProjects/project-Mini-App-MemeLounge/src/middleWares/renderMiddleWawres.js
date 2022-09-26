import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';

const navTemplates = (isUser, user) => html`
    <a href="/catalog">All Memes</a>

    ${isUser 
    ? html` <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${user.email}</span>
            <a href="/profile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
    </div>` 
    : html`<div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`
    }
    
`;

const rootElement = document.querySelector('.main-content');
const nav = document.querySelector('.nav');

function ctxRender(resultTemplate) {
    render(resultTemplate, rootElement);
}

export function addRender(ctx, next) {
    const user = getUserData();
    
    render(navTemplates(ctx.user, user), nav);
    
    ctx.render = ctxRender;

    next();
}