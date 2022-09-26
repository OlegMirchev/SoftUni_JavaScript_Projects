import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { albumTemplate } from './templates/albumTemplate.js';

const searchTemplate = (searchHandler, albums, isLogged) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${searchHandler}>Search</button>
    </div>

    <h2>Results:</h2>

   ${albums.length > 0
    ? albums.map(a => albumTemplate(a, isLogged))
    : html`<p class="no-result">No result.</p>`
    }
</section>
`;

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        e.preventDefault();

        let searchElement = document.querySelector('#search-input');
        console.log(searchElement.value);

        albumService.search(searchElement.value)
            .then(albums => {
                let isLogged = Boolean(ctx.user);
                ctx.render(searchTemplate(searchHandler, albums, isLogged));
            })
    };

    ctx.render(searchTemplate(searchHandler, []));
};