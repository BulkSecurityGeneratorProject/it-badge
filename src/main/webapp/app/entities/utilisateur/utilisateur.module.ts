import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../../shared';
import {
    UtilisateurService,
    UtilisateurPopupService,
    UtilisateurComponent,
    UtilisateurDetailComponent,
    UtilisateurDialogComponent,
    UtilisateurPopupComponent,
    UtilisateurDeletePopupComponent,
    UtilisateurDeleteDialogComponent,
    utilisateurRoute,
    utilisateurPopupRoute,
    UtilisateurResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...utilisateurRoute,
    ...utilisateurPopupRoute,
];

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UtilisateurComponent,
        UtilisateurDetailComponent,
        UtilisateurDialogComponent,
        UtilisateurDeleteDialogComponent,
        UtilisateurPopupComponent,
        UtilisateurDeletePopupComponent,
    ],
    entryComponents: [
        UtilisateurComponent,
        UtilisateurDialogComponent,
        UtilisateurPopupComponent,
        UtilisateurDeleteDialogComponent,
        UtilisateurDeletePopupComponent,
    ],
    providers: [
        UtilisateurService,
        UtilisateurPopupService,
        UtilisateurResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeUtilisateurModule {}
