/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ItbadgeTestModule } from '../../../test.module';
import { UtilisateurDialogComponent } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur-dialog.component';
import { UtilisateurService } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../../../../main/webapp/app/entities/utilisateur/utilisateur.model';
import { GroupeService } from '../../../../../../main/webapp/app/entities/groupe';
import { CoursService } from '../../../../../../main/webapp/app/entities/cours';

describe('Component Tests', () => {

    describe('Utilisateur Management Dialog Component', () => {
        let comp: UtilisateurDialogComponent;
        let fixture: ComponentFixture<UtilisateurDialogComponent>;
        let service: UtilisateurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [UtilisateurDialogComponent],
                providers: [
                    GroupeService,
                    CoursService,
                    UtilisateurService
                ]
            })
            .overrideTemplate(UtilisateurDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Utilisateur(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Utilisateur();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
