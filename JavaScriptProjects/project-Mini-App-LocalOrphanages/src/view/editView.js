import { html } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../api/postsService.js';
import { creatSubmitHandler } from '../utils.js';

const editTemplate = (post, submitHandler) => html`
<section id="edit-page" class="auth">
    <form @submit=${submitHandler} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" .value=${post.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" .value=${post.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" .value=${post.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" .value=${post.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" .value=${post.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>
`;

export async function editView(ctx) {
    const postId = ctx.params.id;
    const post = await postsService.getPostById(postId);

    ctx.render(editTemplate(post, creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    const postId = ctx.params.id;

    if (Object.values(formData).some(f => f === '')) {
        return alert('Some field is Empty!');
    }

    await postsService.edit(postId, {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        address: formData.address,
        phone: formData.phone
    });

    e.target.reset();

    ctx.page.redirect(`/details/${postId}`);
}