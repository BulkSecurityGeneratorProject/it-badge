import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Description } from './description.model';
import { DescriptionService } from './description.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-description',
    templateUrl: './description.component.html'
})
export class DescriptionComponent implements OnInit, OnDestroy {
descriptions: Description[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private descriptionService: DescriptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.descriptionService.query().subscribe(
            (res: HttpResponse<Description[]>) => {
                this.descriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDescriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Description) {
        return item.id;
    }
    registerChangeInDescriptions() {
        this.eventSubscriber = this.eventManager.subscribe('descriptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
