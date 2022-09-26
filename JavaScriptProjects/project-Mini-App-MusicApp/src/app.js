import page from '../node_modules/page/page.mjs';
import { authMiddleWares } from './middleWares/authMiddleWares.js';
import { renderNavigation, renderContent } from './middleWares/rendeMiddleWares.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logout } from './views/logout.js';
import { registerView } from './views/registerView.js';
import { searchView } from './views/searchView.js';

page(authMiddleWares);
page(renderNavigation);
page(renderContent);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/catalog', catalogView);
page('/create', createView);
page('/albums/:albumId', detailsView);
page('/albums/:albumId/edit', editView);
page('/albums/:albumId/delete', deleteView);
page('/search', searchView);

page.start();