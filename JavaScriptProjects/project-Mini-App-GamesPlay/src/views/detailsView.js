import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/gamesService.js';
import { commentsView } from './commentsView.js';
import { commentFormView } from './commentForm.js';

const detailsTemplate = (game, isOwner, commentsSection, commentFormSection, onDelete) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        ${commentsSection}

        ${isOwner
        ? html`<div class="buttons">
                  <a href="/edit/${game._id}" class="button">Edit</a>
                  <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
               </div>`
        : nothing
         }
        
    </div>

    ${commentFormSection}

</section>
`;

export async function detailsView(ctx) {
    const gameid = ctx.params.id;
    const [game, commentsSection] = await Promise.all([
        gameService.getById(gameid),
        commentsView(gameid)
    ]);

    const commentFormSection = commentFormView(ctx);

    let isOwner = false;

    if (ctx.user) {
        isOwner = ctx.user._id === game._ownerId;
    }

    ctx.render(detailsTemplate(game, isOwner, commentsSection, commentFormSection, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure remove ${game.title}?`);

        if (choice) {
            await gameService.deleteById(gameid);
            ctx.page.redirect('/');
        }
    }
}