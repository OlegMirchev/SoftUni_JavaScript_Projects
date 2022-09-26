import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as postsService from '../api/postsService.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (post, isOwner, isUser, onDelete, onDonate, donate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${post.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${post.donate}</p>

                ${isOwner
                ? html`<div class="btns">
                           <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                           <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
                       </div>`
                : nothing
                 }

                 ${isUser && !isOwner
                 ? html`<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>` 
                 : nothing
                 }
            
            </div>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const isUser = ctx.user;
    const postId = ctx.params.id;
    const post = await postsService.getPostById(postId);
    
    let isOwner = ctx.user?._id === post._ownerId;

    let donate = 0;

    ctx.render(detailsTemplate(post, isOwner, isUser, onDelete, onDonate, donate));

    async function onDelete() {
        const choice = confirm(`Are you sure to want remove ${post.title}?`);
        
        if (choice) {
            await postsService.removeId(postId);
            ctx.page.redirect('/catalog');
        }
    }
    
    async function onDonate(e) {
        const user = getUserData();

        const choice = confirm(`Are you sure to want a donate ${post.title}?`);
        
        if (choice) {
            e.target.style.display = 'none';
            
            await postsService.donations(postId);
            
            await postsService.donateSize(ctx.params.id);
            
           post.donate = await postsService.donationsUser(ctx.params.id, user._id);
           console.log(post.donate);

        }
    }
}