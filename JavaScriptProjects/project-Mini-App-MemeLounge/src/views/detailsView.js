import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../api/memeService.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${isOwner 
            ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} href="javascript:void(0)" class="button danger">Delete</button>`
            : nothing
            }

        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const memeId = ctx.params.id;
    const meme = await memeService.getById(memeId);

    let isOwner = false;

    if (ctx.user) {
        isOwner = ctx.user.id === meme._ownerId;  // <=  isOwner = ctx.user?.id === meme._ownerId    
    }

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure to want remove ${meme.title}?`);

        if (choice) {
            await memeService.remove(memeId);
            ctx.page.redirect('/catalog');
        }
    }
}