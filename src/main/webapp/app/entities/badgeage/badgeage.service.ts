import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Badgeage } from './badgeage.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Badgeage>;

@Injectable()
export class BadgeageService {

    private resourceUrl =  SERVER_API_URL + 'api/badgeages';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(badgeage: Badgeage): Observable<EntityResponseType> {
        const copy = this.convert(badgeage);
        return this.http.post<Badgeage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(badgeage: Badgeage): Observable<EntityResponseType> {
        const copy = this.convert(badgeage);
        return this.http.put<Badgeage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Badgeage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Badgeage[]>> {
        const options = createRequestOption(req);
        return this.http.get<Badgeage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Badgeage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Badgeage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Badgeage[]>): HttpResponse<Badgeage[]> {
        const jsonResponse: Badgeage[] = res.body;
        const body: Badgeage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Badgeage.
     */
    private convertItemFromServer(badgeage: Badgeage): Badgeage {
        const copy: Badgeage = Object.assign({}, badgeage);
        copy.badgeageEleve = this.dateUtils
            .convertLocalDateFromServer(badgeage.badgeageEleve);
        copy.badgeageCorrige = this.dateUtils
            .convertLocalDateFromServer(badgeage.badgeageCorrige);
        return copy;
    }

    /**
     * Convert a Badgeage to a JSON which can be sent to the server.
     */
    private convert(badgeage: Badgeage): Badgeage {
        const copy: Badgeage = Object.assign({}, badgeage);
        copy.badgeageEleve = this.dateUtils
            .convertLocalDateToServer(badgeage.badgeageEleve);
        copy.badgeageCorrige = this.dateUtils
            .convertLocalDateToServer(badgeage.badgeageCorrige);
        return copy;
    }
}
