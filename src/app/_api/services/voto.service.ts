import { Voto } from './../models/voto';
/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class VotoService extends BaseService {
    constructor(
        config: ApiConfiguration,
        http: HttpClient
    ) {
        super(config, http);
    }


    /**
    * @return List of Voti
    */
    private getVotiResponse(): Observable<HttpResponse<Voto[]>> {
        let __params = this.newParams();
        let __headers = new HttpHeaders();
        let __body: any = null;
        let req = new HttpRequest<any>(
            "GET",
            this.rootUrl + `rest/voti/all`,
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
                let _body: Voto[] = null;
                _body = _resp.body as Voto[];
                return _resp.clone({ body: _body }) as HttpResponse<Voto[]>;
            })
        );
    }

    /**
     * @return List of Voti
     */
    getVoti(): Observable<Voto[]> {
        return this.getVotiResponse().pipe(
            map(_r => _r.body)
        );
    }

    /**
   * @return Single Voto
   */
  private getFilmResponse(votoId: string): Observable<HttpResponse<Voto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/voti/` + votoId,
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
        let _body: Voto = null;
        _body = _resp.body as Voto;
        return _resp.clone({ body: _body }) as HttpResponse<Voto>;
      })
    );
  }

  /**
   * @return Single Voto
   */
  getVoto(idFilm: string): Observable<Voto> {
    return this.getFilmResponse(idFilm).pipe(
      map(_r => _r.body)
    );
  }


       /**
    * @return Voto By FilmId
    */
   private getVotiByIdFilm_IdCustomerResponse(filmId: string, customerId: string): Observable<HttpResponse<Voto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/voti/byFilm_CustomerId/` + filmId + '/' + customerId,
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
        let _body: Voto = null;
        _body = _resp.body as Voto;
        return _resp.clone({body: _body}) as HttpResponse<Voto>;
      })
    );
  }

  /**
   * @return Voto By FilmId
   */
  getVotiByIdFilm_IdCustomer(filmId: string, customerId: string): Observable<Voto> {
    return this.getVotiByIdFilm_IdCustomerResponse(filmId, customerId).pipe(
      map(_r => _r.body)
    );
  }

 /**
   * @param body Voto
   * @return List Of Voti
   */
  private addVotoResponse(body: Voto): Observable<HttpResponse<Voto[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `rest/voti/insertVoto`,
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
        let _body: Voto[] = null;
        _body = _resp.body as Voto[];
        return _resp.clone({body: _body}) as HttpResponse<Voto[]>;
      })
    );
  }

  /**
   * @param body Voto
   * @return List Of Voti
   */
   addVoto(body: Voto): Observable<Voto[]> {
    return this.addVotoResponse(body).pipe(
      map(_r => _r.body)
    );
  }

  /**
     *
     * - `id`: 
     *
     * - `body`: 
     *
     * @return List of Voti
     */
    private updateVotoResponse(params: Voto): Observable<HttpResponse<Voto>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;

      __body = params;
      let req = new HttpRequest<any>(
          "PUT",
          this.rootUrl + 'rest/voti/upDateVotoById/' + params.id,
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
              let _body: Voto = null;
              _body = _resp.body as Voto;
              return _resp.clone({ body: _body }) as HttpResponse<Voto>;
          })
      );
  }

  /**
   *
   * - `id`: 
   *
   * - `body`: 
   *
   * @return List of Voti
   */
  updateVoto(params: Voto): Observable<Voto> {
      return this.updateVotoResponse(params).pipe(
          map(_r => _r.body)
      );
  }


  /**
   * @param id string
   * @return Deleted status
   */
  private deleteVotoResponse(id: string): Observable<HttpResponse<boolean>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;

      let req = new HttpRequest<any>(
          "DELETE",
          this.rootUrl + 'rest/voti/deleteVotoById/' + id,
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
   * @param id string
   * @return Deleted status
   */
  deleteVoto(id: string): Observable<boolean> {
      return this.deleteVotoResponse(id).pipe(
          map(_r => _r.body)
      );
  }

    /**
   * @param id string
   * @return Deleted status
   */
  private deleteVotoByFilmIdResponse(id: string): Observable<HttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
        "DELETE",
        this.rootUrl + 'rest/voti/deleteVotoByFilmId/' + id,
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
deleteVotoByFilmId(id: string): Observable<boolean> {
    return this.deleteVotoByFilmIdResponse(id).pipe(
        map(_r => _r.body)
    );
}

}