import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ItbadgeSharedModule } from '../shared';

import {
    Register,
    LoginService,
    PasswordResetInitService,
    PasswordResetFinishService,
    RegisterComponent,
    LoginComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    accountState
} from './';

@NgModule({
    imports: [
        ItbadgeSharedModule,
        RouterModule.forChild(accountState)
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent
    ],
    providers: [
        Register,
        LoginService,
        PasswordResetInitService,
        PasswordResetFinishService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItbadgeAccountModule {}
