import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import * as careerService from '../api/careerService.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (career, isOwner, isUser, onDelete, onApply, count) => html`
<section id="details">
    <div id="details-wrapper">
    <img id="details-img" src=${career.imageUrl} alt="example1" />
    <p id="details-title">${career.title}</p>
    <p id="details-category">
        Category: <span id="categories">${career.category}</span>
    </p>
    <p id="details-salary">
        Salary: <span id="salary-number">${career.salary}</span>
    </p>
    <div id="info-wrapper">
        <div id="details-description">
        <h4>Description</h4>
        <span
            >${career.description}</span
        >
        </div>
        <div id="details-requirements">
        <h4>Requirements</h4>
        <span
            >${career.requirements}</span
        >
        </div>
    </div>
    <p>Applications: <strong id="applications">${count}</strong></p>

    ${isOwner 
    ? html`<div id="action-buttons">
    <a href="/edit/${career._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    : nothing
    }

    ${isUser && !isOwner
    ? html`<a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>` 
    : nothing
    }

    </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const isUser = ctx.user;
    const careerId = ctx.params.id;
    const career = await careerService.getById(careerId);

    let isOwner = false;

    if (ctx.user) {
        isOwner = ctx.user._id === career._ownerId;  // <=  isOwner = ctx.user?.id === career._ownerId  
    }

    let count = 0;

    ctx.render(detailsTemplate(career, isOwner, isUser, onDelete, onApply, count));

    async function onDelete() {
        const choice = confirm(`Are you sure to want remove ${career.title}?`);

        if (choice) {
            await careerService.remove(careerId);
            ctx.page.redirect('/catalog');
        }
    }

    async function onApply(e) {
        let applyBtn = document.getElementById('apply-btn');
      const user = getUserData();
      e.target.style.display = 'none';

      await careerService.postApplication(careerId);

      const getCount = await careerService.getCount(careerId);
      console.log(getCount);

      let applys = await careerService.apply(careerId, user._id);
      console.log(applys);

      count = applys;

    }
}