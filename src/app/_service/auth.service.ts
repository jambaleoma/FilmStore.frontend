import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// tslint:disable:max-line-length

@Injectable()

export class AuthService {
  private message: string;

  constructor(private router: Router) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  loginAdmin(): void {
    localStorage.setItem('token',
    `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGaWxtIFN0b3JlIiwiaWF0IjoxNTMzMjczOTY5LCJleHAiOjE1NjQ4MTAwMDUsImF1ZCI6Ind3dy5maWxtc3RvcmUuY29tIiwic3ViIjoiU2FmZS1HdWFyZCIsIkdpdmVuTmFtZSI6IlZpbmNlbnpvIiwiU3VybmFtZSI6IkQnQW1pY28iLCJFbWFpbCI6InZpbmNlbnpvZGFtaWNvOTNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIn0.yvdPqyupXAYMxfXSbnWuXGYLkCjRw6u-EA24pPGIN48`);
    this.router.navigate(['filmStore']);
  }

  login(): void {
    localStorage.setItem('token',
    `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJGaWxtIFN0b3JlIiwiaWF0IjoxNTMzMjczOTY5LCJleHAiOjE1NjQ4MTAwMDUsImF1ZCI6Ind3dy5maWxtc3RvcmUuY29tIiwic3ViIjoiU2FmZS1HdWFyZCIsIkdpdmVuTmFtZSI6IlZpbmNlbnpvIiwiU3VybmFtZSI6IkQnQW1pY28iLCJFbWFpbCI6InZpbmNlbnpvZGFtaWNvOTNAZ21haWwuY29tIiwicm9sZSI6IlVzZXIifQ.2r545yV4QWoHmzzghzAXeuGg8pVls2qvBhTTaniMrrw`);
    this.router.navigate(['filmStore']);
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.clear();
    this.router.navigate(['/login']);
  }

  checkRole() {
    return this.parseJwt(localStorage.getItem('token'));
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));

    return jsonPayload.role;
  }

}
