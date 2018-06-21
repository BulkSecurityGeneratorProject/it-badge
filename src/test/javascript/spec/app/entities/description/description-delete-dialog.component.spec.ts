/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ItbadgeTestModule } from '../../../test.module';
import { DescriptionDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/description/description-delete-dialog.component';
import { DescriptionService } from '../../../../../../main/webapp/app/entities/description/description.service';

describe('Component Tests', () => {

    describe('Description Management Delete Component', () => {
        let comp: DescriptionDeleteDialogComponent;
        let fixture: ComponentFixture<DescriptionDeleteDialogComponent>;
        let service: DescriptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [DescriptionDeleteDialogComponent],
                providers: [
                    DescriptionService
                ]
            })
            .overrideTemplate(DescriptionDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DescriptionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DescriptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
