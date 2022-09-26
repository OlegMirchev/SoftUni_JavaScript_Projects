import {html} from '../../node_modules/lit-html/lit-html.js';
import { creatSubmitHandler } from '../utils.js';
import * as careerService from '../api/careerService.js';

const createTemplate = (submitHandler) => html`
<section id="create">
    <div class="form">
    <h2>Create Offer</h2>
    <form @submit=${submitHandler} class="create-form">
        <input
        type="text"
        name="title"
        id="job-title"
        placeholder="Title"
        />
        <input
        type="text"
        name="imageUrl"
        id="job-logo"
        placeholder="Company logo url"
        />
        <input
        type="text"
        name="category"
        id="job-category"
        placeholder="Category"
        />
        <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        rows="4"
        cols="50"
        ></textarea>
        <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        rows="4"
        cols="50"
        ></textarea>
        <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        />

        <button type="submit">post</button>
    </form>
    </div>
</section>
`;

export function createView(ctx) {
    ctx.render(createTemplate(creatSubmitHandler(ctx, submitHandler)));
}

async function submitHandler(ctx, formData, e) {
    if (Object.values(formData).some(f => f === '')) {
        return alert('Some field is Empty');
    }

    await careerService.create({
        title: formData.title,
        imageUrl: formData.imageUrl,
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements,
        salary: formData.salary
    });

    e.target.reset();

    ctx.page.redirect('/catalog');
}