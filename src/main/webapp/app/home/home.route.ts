import { Route } from '@angular/router';

import { HomeComponent } from './';
import { UserRouteAccessService } from '../shared';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Welcome, Java Hipster!'
    },
    canActivate: [UserRouteAccessService]
};
