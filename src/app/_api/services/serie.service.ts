/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { Serie } from '../models';

@Injectable()
export class SerieService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }

    /**
     * @return List of SerieTVs
     */
    private getSerieTVsResponse(): Observable<HttpResponse<Serie[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            "GET",
            this.rootUrl + `rest/serie/all`,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'json'
            });

        return this.http.request<any>(req).pipe(
            filter(_r => _r instanceof HttpResponse),
            map(_r => {
                let _resp = _r as HttpResponse<any>;
                let _body: Serie[] = null;
                _body = _resp.body as Serie[];
                return _resp.clone({ body: _body }) as HttpResponse<Serie[]>;
            })
        );
    }

    /**
     * @return List of SerieTVs
     */
    getSerieTVs(): Observable<Serie[]> {
        return this.getSerieTVsResponse().pipe(
            map(_r => _r.body)
        );
    }

}