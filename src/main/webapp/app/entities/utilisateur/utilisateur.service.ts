import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Utilisateur } from './utilisateur.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Utilisateur>;

@Injectable()
export class UtilisateurService {

    private resourceUrl =  SERVER_API_URL + 'api/utilisateurs';

    constructor(private http: HttpClient) { }

    create(utilisateur: Utilisateur): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.post<Utilisateur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(utilisateur: Utilisateur): Observable<EntityResponseType> {
        const copy = this.convert(utilisateur);
        return this.http.put<Utilisateur>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Utilisateur>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Utilisateur[]>> {
        const options = createRequestOption(req);
        return this.http.get<Utilisateur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Utilisateur[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Utilisateur = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Utilisateur[]>): HttpResponse<Utilisateur[]> {
        const jsonResponse: Utilisateur[] = res.body;
        const body: Utilisateur[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Utilisateur.
     */
    private convertItemFromServer(utilisateur: Utilisateur): Utilisateur {
        const copy: Utilisateur = Object.assign({}, utilisateur);
        return copy;
    }

    /**
     * Convert a Utilisateur to a JSON which can be sent to the server.
     */
    private convert(utilisateur: Utilisateur): Utilisateur {
        const copy: Utilisateur = Object.assign({}, utilisateur);
        return copy;
    }
}
