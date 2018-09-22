import { Customer } from './../../_api/models/customer';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerService } from '../../_api/services/customer.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  customerLoggato: Customer;

  items: MenuItem[];

  adminItems: MenuItem[];

  logOutItems: MenuItem[];

  showMenuItems = false;

  adminMode = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('customerfirstName') !== null) {
      this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
        this.customerLoggato = notification;
      });
    }

    if (sessionStorage.getItem('customerfirstName') !== null) {
      this.showMenuItems = true;
    }

    if (sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
      this.adminMode = true;
    }

    this.items = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/filmStore/home' },
      { label: 'Ricerca Film', icon: 'fa fa-film', routerLink: '/filmStore/ricercaFilm' },
      { label: 'Ricerca SerieTV', icon: 'fa fa-television', routerLink: '/filmStore/ricercaSerieTV' },
      { label: 'Richieste', icon: 'fa fa-clipboard',
       routerLink: '/filmStore/richieste/view/' + sessionStorage.getItem('customerfirstName') },
      { label: 'Statistiche', icon: 'fa fa-pie-chart', routerLink: '/filmStore/statistiche' }
    ];

    this.adminItems = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/filmStore/home' },
      {
        label: 'Film', icon: 'fa fa-film', items: [
          { label: 'Ricerca Film', icon: 'fa fa-search', routerLink: '/filmStore/ricercaFilm' },
          { label: 'Gestione Film', icon: 'fa fa-wrench', routerLink: '/filmStore/gestioneFilm' }
        ]
      },
      {
        label: 'SerieTV', icon: 'fa fa-television', items: [
          { label: 'Ricerca SerieTV', icon: 'fa fa-search', routerLink: '/filmStore/ricercaSerieTV' },
          { label: 'Gestione SerieTV', icon: 'fa fa-wrench', routerLink: '/filmStore/gestioneSerieTV' }
        ]
      },
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/filmStore/richieste' },
      { label: 'Statistiche', icon: 'fa fa-pie-chart', routerLink: '/filmStore/statistiche' },
      { label: 'Utenti', icon: 'fa fa-users', routerLink: '/filmStore/utenti' }
    ];
  }

  logOut() {
    sessionStorage.clear();
    location.reload();
    this.router.navigate(['/login']);
  }

  openUserProfile() {
    this.router.navigate(['/filmStore/utenti']);
  }
}
