/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { Serie } from '../models';
import { Stagione } from '../models/stagione';

@Injectable()
export class StagioneService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }


    /**
    * @return List of Stagioni
    */
    private getStagioniResponse(): Observable<HttpResponse<Stagione[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            "GET",
            this.rootUrl + `rest/stagioni/all`,
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
                let _body: Stagione[] = null;
                _body = _resp.body as Stagione[];
                return _resp.clone({ body: _body }) as HttpResponse<Stagione[]>;
            })
        );
    }

    /**
     * @return List of Stagioni
     */
    getStagioni(): Observable<Stagione[]> {
        return this.getStagioniResponse().pipe(
            map(_r => _r.body)
        );
    }


       /**
    * @return List of Stagioni By SerieId
    */
   private getStagioniByIdSerieResponse(SerieId: string): Observable<HttpResponse<Stagione[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/stagioni/bySerieId/` + SerieId,
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
        let _body: Stagione[] = null;
        _body = _resp.body as Stagione[];
        return _resp.clone({body: _body}) as HttpResponse<Stagione[]>;
      })
    );
  }

  /**
   * @return List of Richiste
   */
  getStagioniByIdSerie(serieId: string): Observable<Stagione[]> {
    return this.getStagioniByIdSerieResponse(serieId).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param body Stagione
   * @return Added Stagione
   */
  private addStagioneResponse(body: Stagione): Observable<HttpResponse<Stagione[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/stagioni/insertStagione`,
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
        let _body: Stagione[] = null;
        _body = _resp.body as Stagione[];
        return _resp.clone({body: _body}) as HttpResponse<Stagione[]>;
      })
    );
  }

  /**
   * @param body Stagione
   * @return Added Stagione
   */
   addStagione(body: Stagione): Observable<Stagione[]> {
    return this.addStagioneResponse(body).pipe(
      map(_r => _r.body)
    );
  }

}