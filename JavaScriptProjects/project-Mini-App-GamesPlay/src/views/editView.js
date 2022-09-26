import { html } from '../../node_modules/lit-html/lit-html.js';
import * as gameService from '../api/gamesService.js';
import { creatSubmitHandler } from '../utils.js';

const editTemplate = (game, submitHandler) => html`
<section id="edit-page" class="auth">
    <form @submit=${submitHandler} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${game.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${game.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${game.summary}></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const gameid = ctx.params.id;
    const game = await gameService.getById(gameid);

    ctx.render(editTemplate(game, creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    const gameid = ctx.params.id;

    if (Object.values(formData).some(f => f === '')) {
        return alert('Some field is Empty');
    }

    await gameService.edit(gameid, {
        title: formData.title,
        category: formData.category,
        maxLevel: formData.maxLevel,
        imageUrl: formData.imageUrl,
        summary: formData.summary
    });

    e.target.reset();

    ctx.page.redirect('/details/' + gameid);
}