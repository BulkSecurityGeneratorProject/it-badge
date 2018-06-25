import { Routes } from '@angular/router';

import {
    loginRoute,
    settingsRoute
} from './';

const ACCOUNT_ROUTES = [
    loginRoute,
    settingsRoute
];

export const accountState: Routes = [{
    path: '',
    children: ACCOUNT_ROUTES
}];
