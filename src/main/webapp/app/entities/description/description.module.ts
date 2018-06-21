import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../../shared';
import {
    DescriptionService,
    DescriptionPopupService,
    DescriptionComponent,
    DescriptionDetailComponent,
    DescriptionDialogComponent,
    DescriptionPopupComponent,
    DescriptionDeletePopupComponent,
    DescriptionDeleteDialogComponent,
    descriptionRoute,
    descriptionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...descriptionRoute,
    ...descriptionPopupRoute,
];

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DescriptionComponent,
        DescriptionDetailComponent,
        DescriptionDialogComponent,
        DescriptionDeleteDialogComponent,
        DescriptionPopupComponent,
        DescriptionDeletePopupComponent,
    ],
    entryComponents: [
        DescriptionComponent,
        DescriptionDialogComponent,
        DescriptionPopupComponent,
        DescriptionDeleteDialogComponent,
        DescriptionDeletePopupComponent,
    ],
    providers: [
        DescriptionService,
        DescriptionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeDescriptionModule {}
