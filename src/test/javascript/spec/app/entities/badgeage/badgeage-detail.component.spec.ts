/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ItbadgeTestModule } from '../../../test.module';
import { BadgeageDetailComponent } from '../../../../../../main/webapp/app/entities/badgeage/badgeage-detail.component';
import { BadgeageService } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.service';
import { Badgeage } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.model';

describe('Component Tests', () => {

    describe('Badgeage Management Detail Component', () => {
        let comp: BadgeageDetailComponent;
        let fixture: ComponentFixture<BadgeageDetailComponent>;
        let service: BadgeageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [BadgeageDetailComponent],
                providers: [
                    BadgeageService
                ]
            })
            .overrideTemplate(BadgeageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Badgeage(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.badgeage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
