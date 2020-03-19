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
            // 'https://filmstore-43be0.firebaseio.com/Serie-Tv.json',
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

     /**
   * @return List of New Serie
   */
  private getNewSerieResponse(numeberOfNewSerie: string): Observable<HttpResponse<Serie[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/serie/allNewSerie/` + numeberOfNewSerie,
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
   * @return List of New Serie
   */
  getNewSerie(numeberOfNewSerie: string): Observable<Serie[]> {
    return this.getNewSerieResponse(numeberOfNewSerie).pipe(
      map(_r => _r.body)
    );
  }

    /**
    * @return Single SerieTV
    */
    private getSerieTVResponse(serieId: string): Observable<HttpResponse<Serie>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            "GET",
            this.rootUrl + `rest/serie/` + serieId,
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
                return _resp.clone({ body: _body }) as HttpResponse<Serie>;
            })
        );
    }

    /**
     * @return Single SerieTV
     */
    getSerie(serieId: string): Observable<Serie> {
        return this.getSerieTVResponse(serieId).pipe(
            map(_r => _r.body)
        );
    }

    /**
     * @param body SerieTV
     * @return Added SerieTV
     */
    private addSerieResponse(body: Serie): Observable<HttpResponse<Serie[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        __body = body;
        let req = new HttpRequest<any>(
            "POST",
            this.rootUrl + `rest/serie/insertSerie`,
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
     * @param body Richiesta
     * @return Added Richiesta
     */
    addSerie(body: Serie): Observable<Serie[]> {
        return this.addSerieResponse(body).pipe(
            map(_r => _r.body)
        );
    }

    /**
     *
     * - `id`:
     *
     * - `body`:
     *
     * @return Updated Serie
     */
    private updateSerieResponse(params: Serie): Observable<HttpResponse<Serie[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        __body = params;
        let req = new HttpRequest<any>(
            "PUT",
            this.rootUrl + 'rest/serie/upDateSerieById/' + params.serie_id,
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
     *
     * - `id`:
     *
     * - `body`:
     *
     * @return Updated Serie
     */
    updateSerie(params: Serie): Observable<Serie[]> {
        return this.updateSerieResponse(params).pipe(
            map(_r => _r.body)
        );
    }


    /**
     * @param id undefined
     * @return Deleted status
     */
    private deleteSerieResponse(id: string): Observable<HttpResponse<boolean>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;

        let req = new HttpRequest<any>(
            "DELETE",
            this.rootUrl + 'rest/serie/deleteSerieById/' + id,
            __body,
            {
                headers: __headers,
                params: __params,
                responseType: 'text'
            });

        return this.http.request<any>(req).pipe(
            filter(_r => _r instanceof HttpResponse),
            map(_r => {
                let _resp = _r as HttpResponse<any>;
                let _body: boolean = null;
                _body = _resp.body == 'true';
                return _resp.clone({ body: _body }) as HttpResponse<boolean>;
            })
        );
    }

    /**
     * @param id undefined
     * @return Deleted status
     */
    deleteSerie(id: string): Observable<boolean> {
        return this.deleteSerieResponse(id).pipe(
            map(_r => _r.body)
        );
    }

}
