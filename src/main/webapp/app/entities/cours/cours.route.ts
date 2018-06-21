import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CoursComponent } from './cours.component';
import { CoursDetailComponent } from './cours-detail.component';
import { CoursPopupComponent } from './cours-dialog.component';
import { CoursDeletePopupComponent } from './cours-delete-dialog.component';

@Injectable()
export class CoursResolvePagingParams implements Resolve<any> {

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

export const coursRoute: Routes = [
    {
        path: 'cours',
        component: CoursComponent,
        resolve: {
            'pagingParams': CoursResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cours'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cours/:id',
        component: CoursDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cours'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const coursPopupRoute: Routes = [
    {
        path: 'cours-new',
        component: CoursPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cours/:id/edit',
        component: CoursPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cours/:id/delete',
        component: CoursDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cours'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
