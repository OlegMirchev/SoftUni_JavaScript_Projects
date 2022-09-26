import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as commentsService from '../api/commentsService.js';
import { creatSubmitHandler } from '../utils.js';

const formTemplate = (submitHandler) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${submitHandler} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`;

export function commentFormView(ctx) {
    if (ctx.user) {
        return formTemplate(creatSubmitHandler(ctx, submitHandler));
    } else {
        return nothing;
    }
}

async function submitHandler(ctx, formData, e) {
    const gameid = ctx.params.id;

    await commentsService.postComment({
        gameid,
        comment: formData.comment
    });

    e.target.reset();

    ctx.page.redirect(`/details/${gameid}`);
}