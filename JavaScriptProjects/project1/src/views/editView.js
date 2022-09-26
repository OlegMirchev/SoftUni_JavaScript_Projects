import {html} from '../../node_modules/lit-html/lit-html.js';
import * as careerService from '../api/careerService.js';
import { creatSubmitHandler } from '../utils.js';

const editTemplate = (career, submitHandler) => html`
<section id="edit">
    <div class="form">
    <h2>Edit Offer</h2>
    <form @submit=${submitHandler} class="edit-form">
        <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        .value=${career.title}
        />
        <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        .value=${career.imageUrl}
        />
        <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        .value=${career.category}
        />
        <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        .value=${career.description}
        ></textarea>
        <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
        .value=${career.requirements}
        ></textarea>
        <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        .value=${career.salary}
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>
`;

export async function editView(ctx) {
    const careerId = ctx.params.id;
    const career = await careerService.getById(careerId);

    ctx.render(editTemplate(career, creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    const careerId = ctx.params.id;

    if (Object.values(formData).some(f => f ==='')) {
        return alert('Some field is Empty!');
    }

    await careerService.edit(careerId, {
        title: formData.title,
        imageUrl: formData.imageUrl,
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements,
        salary: formData.salary
    });
    
    e.target.reset();

    ctx.page.redirect(`/details/${careerId}`);
}