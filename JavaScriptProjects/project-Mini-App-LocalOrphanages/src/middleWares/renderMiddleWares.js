import {render, html} from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (isUser) => html`
<h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/catalog">Dashboard</a>

    ${isUser
    ? html`<div id="user">
              <a href="/posts">My Posts</a>
              <a href="/create">Create Post</a>
              <a href="/logout">Logout</a>
          </div>`
    : html`<div id="guest">
              <a href="/login">Login</a>
              <a href="/register">Register</a>
           </div>`
     }
   
</nav>
`;

const rootElement = document.querySelector('#main-content');
const headerElement = document.querySelector('.my-header');

function ctxRender(resultTemplate) {
    render(resultTemplate, rootElement);
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), headerElement);
    
    ctx.render = ctxRender;

    next();
}