/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { Film } from '../models/film';

@Injectable()
export class FilmService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return List of Films
   */
  private getFilmsResponse(): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/all`,
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
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film[]>;
      })
    );
  }

  /**
   * @return List of Films
   */
  getFilms(): Observable<Film[]> {
    return this.getFilmsResponse().pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @return Single Film
   */
  private getFilmResponse(filmId: string): Observable<HttpResponse<Film>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/films/` + filmId,
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
        let _body: Film[] = null;
        _body = _resp.body as Film[];
        return _resp.clone({ body: _body }) as HttpResponse<Film>;
      })
    );
  }

  /**
   * @return Single Film
   */
  getFilm(idFilm: string): Observable<Film> {
    return this.getFilmResponse(idFilm).pipe(
      map(_r => _r.body)
    );
  }

    /**
     * @param body Film
     * @return Added Film
     */
    private addFilmResponse(body: Film): Observable<HttpResponse<Film[]>> {
      let __params = this.newParams();
      let __headers = new HttpHeaders();
      let __body: any = null;
      __body = body;
      let req = new HttpRequest<any>(
          "POST",
          this.rootUrl + `rest/films/insertFilm`,
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
              let _body: Film[] = null;
              _body = _resp.body as Film[];
              return _resp.clone({ body: _body }) as HttpResponse<Film[]>;
          })
      );
  }

  /**
   * @param body Film
   * @return Added Film
   */
  addFilm(body: Film): Observable<Film[]> {
      return this.addFilmResponse(body).pipe(
          map(_r => _r.body)
      );
  }

/**
 *
 * - `id`: 
 *
 * - `body`: 
 *
 * @return Updated Film
 */
private updateFilmResponse(params: Film): Observable<HttpResponse<Film[]>> {
  let __params = this.newParams();
  let __headers = new HttpHeaders();
  let __body: any = null;

  __body = params;
  let req = new HttpRequest<any>(
    "PUT",
    this.rootUrl + 'rest/films/upDateFilmById/' + params._id,
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
      let _body: Film[] = null;
      _body = _resp.body as Film[];
      return _resp.clone({body: _body}) as HttpResponse<Film[]>;
    })
  );
}

/**
 *
 * - `id`: 
 *
 * - `body`: 
 *
 * @return Updated Film
 */
 updateFilm(params: Film): Observable<Film[]> {
  return this.updateFilmResponse(params).pipe(
    map(_r => _r.body)
  );
}


/**
 * @param id undefined
 * @return Deleted status
 */
private deleteFilmResponse(id: string): Observable<HttpResponse<boolean>> {
  let __params = this.newParams();
  let __headers = new HttpHeaders();
  let __body: any = null;

  let req = new HttpRequest<any>(
    "DELETE",
    this.rootUrl + 'rest/films/deleteFilmById/' + id,
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
      return _resp.clone({body: _body}) as HttpResponse<boolean>;
    })
  );
}

/**
 * @param id undefined
 * @return Deleted status
 */
 deleteFilm(id: string): Observable<boolean> {
  return this.deleteFilmResponse(id).pipe(
    map(_r => _r.body)
  );
}

}
