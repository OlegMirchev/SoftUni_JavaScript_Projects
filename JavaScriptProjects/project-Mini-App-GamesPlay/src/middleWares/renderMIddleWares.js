import {render, html} from '../../node_modules/lit-html/lit-html.js';

const navTemplate = (isUser) => html`
 <h1><a class="home" href="/">GamesPlay</a></h1>
    <nav>
        <a href="/catalog">All games</a>

        ${isUser 
        ? html`<div id="user">
                  <a href="/create">Create Game</a>
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
const headerElement = document.querySelector('.myHeader');

function ctxRender(templateResult) {
    render(templateResult, rootElement);
}

export function addRender(ctx, next) {
    render(navTemplate(ctx.user), headerElement);

    ctx.render = ctxRender;

    next();
}