import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Description } from './description.model';
import { DescriptionPopupService } from './description-popup.service';
import { DescriptionService } from './description.service';

@Component({
    selector: 'jhi-description-dialog',
    templateUrl: './description-dialog.component.html'
})
export class DescriptionDialogComponent implements OnInit {

    description: Description;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private descriptionService: DescriptionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
