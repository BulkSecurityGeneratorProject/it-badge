import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../../shared';
import {
    BadgeageService,
    BadgeagePopupService,
    BadgeageComponent,
    BadgeageDetailComponent,
    BadgeageDialogComponent,
    BadgeagePopupComponent,
    BadgeageDeletePopupComponent,
    BadgeageDeleteDialogComponent,
    badgeageRoute,
    badgeagePopupRoute,
    BadgeageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...badgeageRoute,
    ...badgeagePopupRoute,
];

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BadgeageComponent,
        BadgeageDetailComponent,
        BadgeageDialogComponent,
        BadgeageDeleteDialogComponent,
        BadgeagePopupComponent,
        BadgeageDeletePopupComponent,
    ],
    entryComponents: [
        BadgeageComponent,
        BadgeageDialogComponent,
        BadgeagePopupComponent,
        BadgeageDeleteDialogComponent,
        BadgeageDeletePopupComponent,
    ],
    providers: [
        BadgeageService,
        BadgeagePopupService,
        BadgeageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeBadgeageModule {}
