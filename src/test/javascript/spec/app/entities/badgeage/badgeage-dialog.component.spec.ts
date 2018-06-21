/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ItbadgeTestModule } from '../../../test.module';
import { BadgeageDialogComponent } from '../../../../../../main/webapp/app/entities/badgeage/badgeage-dialog.component';
import { BadgeageService } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.service';
import { Badgeage } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.model';
import { UtilisateurService } from '../../../../../../main/webapp/app/entities/utilisateur';

describe('Component Tests', () => {

    describe('Badgeage Management Dialog Component', () => {
        let comp: BadgeageDialogComponent;
        let fixture: ComponentFixture<BadgeageDialogComponent>;
        let service: BadgeageService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [BadgeageDialogComponent],
                providers: [
                    UtilisateurService,
                    BadgeageService
                ]
            })
            .overrideTemplate(BadgeageDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeageDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeageService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Badgeage(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.badgeage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'badgeageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Badgeage();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.badgeage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'badgeageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
