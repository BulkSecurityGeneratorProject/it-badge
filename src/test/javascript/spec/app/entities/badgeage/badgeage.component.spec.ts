/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ItbadgeTestModule } from '../../../test.module';
import { BadgeageComponent } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.component';
import { BadgeageService } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.service';
import { Badgeage } from '../../../../../../main/webapp/app/entities/badgeage/badgeage.model';

describe('Component Tests', () => {

    describe('Badgeage Management Component', () => {
        let comp: BadgeageComponent;
        let fixture: ComponentFixture<BadgeageComponent>;
        let service: BadgeageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ItbadgeTestModule],
                declarations: [BadgeageComponent],
                providers: [
                    BadgeageService
                ]
            })
            .overrideTemplate(BadgeageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BadgeageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Badgeage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.badgeages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
