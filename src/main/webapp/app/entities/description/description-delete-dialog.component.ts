import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Description } from './description.model';
import { DescriptionPopupService } from './description-popup.service';
import { DescriptionService } from './description.service';

@Component({
    selector: 'jhi-description-delete-dialog',
    templateUrl: './description-delete-dialog.component.html'
})
export class DescriptionDeleteDialogComponent {

    description: Description;

    constructor(
        private descriptionService: DescriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.descriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'descriptionListModification',
                content: 'Deleted an description'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-description-delete-popup',
    template: ''
})
export class DescriptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private descriptionPopupService: DescriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.descriptionPopupService
                .open(DescriptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
