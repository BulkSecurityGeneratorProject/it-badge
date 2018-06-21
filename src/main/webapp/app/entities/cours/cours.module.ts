import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../../shared';
import {
    CoursService,
    CoursPopupService,
    CoursComponent,
    CoursDetailComponent,
    CoursDialogComponent,
    CoursPopupComponent,
    CoursDeletePopupComponent,
    CoursDeleteDialogComponent,
    coursRoute,
    coursPopupRoute,
    CoursResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...coursRoute,
    ...coursPopupRoute,
];

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CoursComponent,
        CoursDetailComponent,
        CoursDialogComponent,
        CoursDeleteDialogComponent,
        CoursPopupComponent,
        CoursDeletePopupComponent,
    ],
    entryComponents: [
        CoursComponent,
        CoursDialogComponent,
        CoursPopupComponent,
        CoursDeleteDialogComponent,
        CoursDeletePopupComponent,
    ],
    providers: [
        CoursService,
        CoursPopupService,
        CoursResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeCoursModule {}
