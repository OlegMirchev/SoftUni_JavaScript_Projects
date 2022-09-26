import page from '../node_modules/page/page.mjs';

import { addSession } from './middleWares/sessionMiddleWares.js';
import { addRender } from './middleWares/renderMiddleWawres.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';
import { logout } from './views/logout.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/profile', profileView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/logout', logout);

page.start();