import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];

  adminItems: MenuItem[];

  logOutItems: MenuItem[];

  showMenuItems = false;

  adminMode = false;

  ngOnInit() {

    if (sessionStorage.getItem('customerfirstName') !== null) {
      this.showMenuItems = true;
    }

    if (sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
      this.adminMode = true;
    }

    this.items = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/home' },
      { label: 'Ricerca Film', icon: 'fa fa-film', routerLink: '/ricercaFilm' },
      { label: 'Ricerca SerieTV', icon: 'fa fa-television', routerLink: '/ricercaSerieTV' },
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/richieste' },
      { label: 'Statistiche', icon: 'fa fa-pie-chart', routerLink: '/statistiche' },
      { label: 'Profilo', icon: 'fa fa-user', routerLink: '/utenti' }
    ];

    this.adminItems = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/home' },
      { label: 'Film', icon: 'fa fa-film', items: [
        { label: 'Ricerca Film', icon: 'fa fa-search', routerLink: '/ricercaFilm'},
        { label: 'Gestione Film', icon: 'fa fa-wrench', routerLink: '/gestioneFilm'}
      ]},
      { label: 'SerieTV', icon: 'fa fa-television', items: [
        { label: 'Ricerca SerieTV', icon: 'fa fa-search', routerLink: '/ricercaSerieTV' },
        { label: 'Gestione SerieTV', icon: 'fa fa-wrench', routerLink: '/gestioneSerieTV' }
      ]},
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/richieste' },
      { label: 'Statistiche', icon: 'fa fa-pie-chart', routerLink: '/statistiche' },
      { label: 'Utenti', icon: 'fa fa-users', routerLink: '/utenti' }
    ];

    this.logOutItems = [
      {
        label: 'Logout',
        icon: 'fa fa-sign-out',
        routerLink: '/login',
        command: () => {
          sessionStorage.clear();
          location.reload();
        },
      }
    ];
  }

}
