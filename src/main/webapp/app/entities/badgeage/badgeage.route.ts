import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BadgeageComponent } from './badgeage.component';
import { BadgeageDetailComponent } from './badgeage-detail.component';
import { BadgeagePopupComponent } from './badgeage-dialog.component';
import { BadgeageDeletePopupComponent } from './badgeage-delete-dialog.component';

@Injectable()
export class BadgeageResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const badgeageRoute: Routes = [
    {
        path: 'badgeage',
        component: BadgeageComponent,
        resolve: {
            'pagingParams': BadgeageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Badgeages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'badgeage/:id',
        component: BadgeageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Badgeages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const badgeagePopupRoute: Routes = [
    {
        path: 'badgeage-new',
        component: BadgeagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Badgeages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'badgeage/:id/edit',
        component: BadgeagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Badgeages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'badgeage/:id/delete',
        component: BadgeageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Badgeages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
