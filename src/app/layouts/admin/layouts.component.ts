import { Customer } from './../../_api/models/customer';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CustomerService } from '../../_api/services/customer.service';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  loggedCustomer: Customer;

  items: MenuItem[];

  adminItems: MenuItem[];

  itemsProfile: MenuItem[];

  logOutItems: MenuItem[];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
      this.itemsProfile = [
        {
          label: 'Profilo Personale' , icon: 'fa fa-user', command: () => {
            this.openUserProfile();
          }
        },
        {
          label: 'Impostazioni', icon: 'fa fa-cog', command: () => {
            this.goToManageCustomer(this.loggedCustomer.firstName);
          }
        },
        {
          label: 'Logout', icon: 'fa fa-sign-out', command: () => {
            this.logOut();
          }
        }
      ];

      this.items = [
        { label: 'Home', icon: 'fa fa-home', routerLink: '/filmStore/home' },
        { label: 'Ricerca SerieTV', icon: 'fa fa-television', routerLink: '/filmStore/ricercaSerieTV' },
        { label: 'Ricerca Film', icon: 'fa fa-film', routerLink: '/filmStore/ricercaFilm' },
        {
          label: 'Richieste', icon: 'fa fa-clipboard',
          routerLink: '/filmStore/richieste/view/' + this.loggedCustomer.firstName
        }
      ];
    });
  }

  ngOnInit() {
    this.loadAdminMenuItems();
  }

  loadAdminMenuItems() {

    this.adminItems = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/filmStore/home' },
      {
        label: 'SerieTV', icon: 'fa fa-television', items: [
          { label: 'Ricerca SerieTV', icon: 'fa fa-search', routerLink: '/filmStore/ricercaSerieTV' },
          { label: 'Gestione SerieTV', icon: 'fa fa-wrench', routerLink: '/filmStore/gestioneSerieTV' }
        ]
      },
      {
        label: 'Film', icon: 'fa fa-film', items: [
          { label: 'Ricerca Film', icon: 'fa fa-search', routerLink: '/filmStore/ricercaFilm' },
          { label: 'Gestione Film', icon: 'fa fa-wrench', routerLink: '/filmStore/gestioneFilm' }
        ]
      },
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/filmStore/richieste' },
      { label: 'Utenti', icon: 'fa fa-users', routerLink: '/filmStore/utenti' },
      { label: 'Statistiche', icon: 'fa fa-pie-chart', routerLink: '/filmStore/statistiche' }
    ];
  }

  logOut() {
    this.authService.logout();
  }

  openUsersProfile() {
    this.router.navigate(['/filmStore/utenti']);
  }

  openUserProfile() {
    this.router.navigate(['/filmStore/profiloUtente']);
  }

  goToManageCustomer(nomeCustomer: string) {
    this.router.navigate(['/filmStore/gestioneUtente/view/' + nomeCustomer]);
  }

}
