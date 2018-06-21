import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Description } from './description.model';
import { DescriptionPopupService } from './description-popup.service';
import { DescriptionService } from './description.service';
import { Cours, CoursService } from '../cours';

@Component({
    selector: 'jhi-description-dialog',
    templateUrl: './description-dialog.component.html'
})
export class DescriptionDialogComponent implements OnInit {

    description: Description;
    isSaving: boolean;

    cours: Cours[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private descriptionService: DescriptionService,
        private coursService: CoursService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.coursService.query()
            .subscribe((res: HttpResponse<Cours[]>) => { this.cours = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.description.id !== undefined) {
            this.subscribeToSaveResponse(
                this.descriptionService.update(this.description));
        } else {
            this.subscribeToSaveResponse(
                this.descriptionService.create(this.description));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Description>>) {
        result.subscribe((res: HttpResponse<Description>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Description) {
        this.eventManager.broadcast({ name: 'descriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCoursById(index: number, item: Cours) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-description-popup',
    template: ''
})
export class DescriptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private descriptionPopupService: DescriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.descriptionPopupService
                    .open(DescriptionDialogComponent as Component, params['id']);
            } else {
                this.descriptionPopupService
                    .open(DescriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
