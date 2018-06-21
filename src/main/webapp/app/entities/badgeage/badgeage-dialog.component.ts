import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Badgeage } from './badgeage.model';
import { BadgeagePopupService } from './badgeage-popup.service';
import { BadgeageService } from './badgeage.service';
import { Utilisateur, UtilisateurService } from '../utilisateur';

@Component({
    selector: 'jhi-badgeage-dialog',
    templateUrl: './badgeage-dialog.component.html'
})
export class BadgeageDialogComponent implements OnInit {

    badgeage: Badgeage;
    isSaving: boolean;

    utilisateurs: Utilisateur[];
    badgeageEleveDp: any;
    badgeageCorrigeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private badgeageService: BadgeageService,
        private utilisateurService: UtilisateurService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.utilisateurService.query()
            .subscribe((res: HttpResponse<Utilisateur[]>) => { this.utilisateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.badgeage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.badgeageService.update(this.badgeage));
        } else {
            this.subscribeToSaveResponse(
                this.badgeageService.create(this.badgeage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Badgeage>>) {
        result.subscribe((res: HttpResponse<Badgeage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Badgeage) {
        this.eventManager.broadcast({ name: 'badgeageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUtilisateurById(index: number, item: Utilisateur) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-badgeage-popup',
    template: ''
})
export class BadgeagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private badgeagePopupService: BadgeagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.badgeagePopupService
                    .open(BadgeageDialogComponent as Component, params['id']);
            } else {
                this.badgeagePopupService
                    .open(BadgeageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
