import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UtilisateurComponent } from './utilisateur.component';
import { UtilisateurDetailComponent } from './utilisateur-detail.component';
import { UtilisateurPopupComponent } from './utilisateur-dialog.component';
import { UtilisateurDeletePopupComponent } from './utilisateur-delete-dialog.component';

@Injectable()
export class UtilisateurResolvePagingParams implements Resolve<any> {

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

export const utilisateurRoute: Routes = [
    {
        path: 'utilisateur',
        component: UtilisateurComponent,
        resolve: {
            'pagingParams': UtilisateurResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Utilisateurs'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'utilisateur/:id',
        component: UtilisateurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Utilisateurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilisateurPopupRoute: Routes = [
    {
        path: 'utilisateur-new',
        component: UtilisateurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Utilisateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur/:id/edit',
        component: UtilisateurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Utilisateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utilisateur/:id/delete',
        component: UtilisateurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Utilisateurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
