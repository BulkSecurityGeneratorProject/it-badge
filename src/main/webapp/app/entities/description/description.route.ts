import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DescriptionComponent } from './description.component';
import { DescriptionDetailComponent } from './description-detail.component';
import { DescriptionPopupComponent } from './description-dialog.component';
import { DescriptionDeletePopupComponent } from './description-delete-dialog.component';

export const descriptionRoute: Routes = [
    {
        path: 'description',
        component: DescriptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Descriptions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'description/:id',
        component: DescriptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Descriptions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const descriptionPopupRoute: Routes = [
    {
        path: 'description-new',
        component: DescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Descriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'description/:id/edit',
        component: DescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Descriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'description/:id/delete',
        component: DescriptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Descriptions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
