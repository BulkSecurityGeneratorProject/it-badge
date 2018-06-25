import { Routes } from '@angular/router';

import {
    loginRoute,
    registerRoute,
    settingsRoute
} from './';

const ACCOUNT_ROUTES = [
    loginRoute,
    registerRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
