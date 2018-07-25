import { Customer } from './../models/customer';
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

@Injectable()
export class CustomerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return List of Customers
   */
   private getCustomersResponse(): Observable<HttpResponse<Customer[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/customers/all`,
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
        let _body: Customer[] = null;
        _body = _resp.body as Customer[];
        return _resp.clone({body: _body}) as HttpResponse<Customer[]>;
      })
    );
  }

  /**
   * @return List of Customers
   */
   getCustomers(): Observable<Customer[]> {
    return this.getCustomersResponse().pipe(
      map(_r => _r.body)
    );
  }


  /**
   * @return Single Customer By Name
   */
  private getCustomerResponse(customerName: string): Observable<HttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/customers/byName/`+customerName,
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
        let _body: Customer = null;
        _body = _resp.body as Customer;
        return _resp.clone({body: _body}) as HttpResponse<Customer>;
      })
    );
  }

  /**
   * @return Single Customer by Name
   */
   getCustomer(customerName: string): Observable<Customer> {
    return this.getCustomerResponse(customerName).pipe(
      map(_r => _r.body)
    );
  }

    /**
   * @return Single Customer By ID
   */
  private getCustomerByIdResponse(customerId: string): Observable<HttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `rest/customers/`+customerId,
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
        let _body: Customer = null;
        _body = _resp.body as Customer;
        return _resp.clone({body: _body}) as HttpResponse<Customer>;
      })
    );
  }

  /**
   * @return Single Customer by Name
   */
   getCustomerById(customerId: string): Observable<Customer> {
    return this.getCustomerByIdResponse(customerId).pipe(
      map(_r => _r.body)
    );
  }
}
