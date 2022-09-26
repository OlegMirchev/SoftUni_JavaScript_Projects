import page from '../node_modules/page/page.mjs';

import { addSession } from './middleWares/sessionMiddleWares.js';
import { addRender } from './middleWares/renderMiddleWares.js';
import { catalogView } from './view/catalogView.js';
import { loginView } from './view/loginView.js';
import { registerView } from './view/registerView.js';
import { logout } from './view/logout.js';
import { createView } from './view/createView.js';
import { postsView } from './view/postsView.js';
import { detailsView } from './view/detailsView.js';
import { editView } from './view/editView.js';

page(addSession);
page(addRender);

page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/create', createView);
page('/posts', postsView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();