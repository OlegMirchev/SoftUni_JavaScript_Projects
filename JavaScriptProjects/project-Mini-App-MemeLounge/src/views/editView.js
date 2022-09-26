import {html} from '../../node_modules/lit-html/lit-html.js';
import * as memeService from '../api/memeService.js';
import { notify } from '../notifications.js';
import { creatSubmitHandler } from '../util.js';

const editTemplate = (meme, submitHandler) => html`
<section id="edit-meme">
    <form @submit=${submitHandler} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`;

export async function editView(ctx) {
    const memeid = ctx.params.id;
    const meme = await memeService.getById(memeid);

    ctx.render(editTemplate(meme, creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    const memeid = ctx.params.id;

    if (Object.values(formData).some(f => f ==='')) {
        return notify('Some field is Empty!');
    }

    await memeService.edit(memeid, {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl
    });
    
    e.target.reset();

    ctx.page.redirect(`/details/${memeid}`);
}