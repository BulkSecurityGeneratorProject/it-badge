import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Description } from './description.model';
import { DescriptionService } from './description.service';

@Component({
    selector: 'jhi-description-detail',
    templateUrl: './description-detail.component.html'
})
export class DescriptionDetailComponent implements OnInit, OnDestroy {

    description: Description;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private descriptionService: DescriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDescriptions();
    }

    load(id) {
        this.descriptionService.find(id)
            .subscribe((descriptionResponse: HttpResponse<Description>) => {
                this.description = descriptionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDescriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'descriptionListModification',
            (response) => this.load(this.description.id)
        );
    }
}
