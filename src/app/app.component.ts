import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];

  logOutItems: MenuItem[];

  showMenuItems = false;

  ngOnInit() {

    if (sessionStorage.getItem('customerfirstName') !== null) {
      this.showMenuItems = true;
    }

    this.items = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/home' },
      { label: 'Ricerca Film', icon: 'fa fa-film', routerLink: '/ricercaFilm' },
      { label: 'Ricerca SerieTV', icon: 'fa fa-television', routerLink: '/ricercaSerieTV' },
      { label: 'Palinsesto', icon: 'fa fa-calendar', routerLink: '/palinsesto' },
      { label: 'Utenti', icon: 'fa fa-users', routerLink: '/utenti' },
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/richieste' },
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
