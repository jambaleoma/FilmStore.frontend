/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
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
        return _resp.clone({body: _body}) as HttpResponse<Film[]>;
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
      this.rootUrl + `rest/films/`+filmId,
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
        return _resp.clone({body: _body}) as HttpResponse<Film>;
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
}
