import { html, render } from '../../node_modules/lit-html/lit-html.js';
//import { getUserData } from '../utils.js';

const navTemplates = (isUser) => html`
<a id="logo" href="/"
    ><img id="logo-img" src="/images/logo.jpg" alt=""
/></a>

<nav>
    <div>
    <a href="/catalog">Dashboard</a>
    </div>

    ${isUser 
    ? html`<div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
    </div>` 
    : html`<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    </div>`
     }

</nav>
`;

const rootElement = document.querySelector('.main-content');
const nav = document.querySelector('.nav');

function ctxRender(resultTemplate) {
    render(resultTemplate, rootElement);
}

export function addRender(ctx, next) {
    //const user = getUserData();

    render(navTemplates(ctx.user), nav);
    
    ctx.render = ctxRender;

    next();
}