import {html} from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../util.js';
import * as memeService from '../api/memeService.js';
import { notify } from '../notifications.js';

const createTemplate = (submitHandler) => html`
<section id="create-meme">
    <form @submit=${submitHandler} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`;

export function createView(ctx) {
    ctx.render(createTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (Object.values(formData).some(f => f === '')) {
        return notify('Some field is Empty');
    }

    await memeService.create({
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl
    });

    e.target.reset();

    ctx.page.redirect('/catalog');
}