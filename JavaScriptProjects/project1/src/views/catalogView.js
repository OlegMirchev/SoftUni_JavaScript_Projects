import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carrerService from '../api/careerService.js';

const catalogTemplate = (careers) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

   ${careers.length > 0 
    ? careers.map(previewTemplate) 
    : html`<h2>No offers yet.</h2>`
    }

</section>
`;

const previewTemplate = (career) => html`
<div class="offer">
    <img src=${career.imageUrl} alt="example1" />
    <p>
        <strong>Title: </strong><span class="title">${career.title}</span>
    </p>
    <p><strong>Salary:</strong><span class="salary">${career.salary}</span></p>
    <a class="details-btn" href="/details/${career._id}">Details</a>
</div>
`;

export async function catalogView(ctx) {
    const careers = await carrerService.getAll();

    ctx.render(catalogTemplate(careers));
}