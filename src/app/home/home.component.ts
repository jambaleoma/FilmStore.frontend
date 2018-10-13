import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../_api/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSerieTvAdminDialog = false;
  loggedCustomer: Customer;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
    });
  }

  goToSerieTv() {
    this.router.navigate(['filmStore/ricercaSerieTV']);
  }

  goToSerieTvOnAdminMode() {
    this.router.navigate(['filmStore/gestioneSerieTV']);
  }

  goToFilms() {
    this.router.navigate(['filmStore/ricercaFilm']);
  }

  goToFilmsOnAdminMode() {
    this.router.navigate(['filmStore/gestioneFilm']);
  }

  goToRicheiste() {
    this.router.navigate(['filmStore/richieste/view', sessionStorage.getItem('customerfirstName')]);
  }

  goToUtentiAdminMode() {
    this.router.navigate(['filmStore/utenti']);
  }

  goToRicheisteOnAdminMode() {
    this.router.navigate(['filmStore/richieste']);
  }
}
