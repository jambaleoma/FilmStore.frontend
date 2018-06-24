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
   * @return List of Messages
   */
   private getFilmsResponse(): Observable<HttpResponse<Film[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'FooBar',
        'Access-Control-Allow-Headers': 'X-Custom-Header',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
      }
    );
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/rest/films/all.json`,
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
   * @return List of Messages
   */
   getFilms(): Observable<Film[]> {
    return this.getFilmsResponse().pipe(
      map(_r => _r.body)
    );
  }
}