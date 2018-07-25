import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../node_modules/primeng/components/common/menuitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'fa fa-home', routerLink: '/home' },
      { label: 'Ricerca Film', icon: 'fa fa-film', routerLink: '/ricercaFilm' },
      { label: 'Palinsesto', icon: 'fa fa-calendar', routerLink: '/palinsesto' },
      { label: 'Utenti', icon: 'fa fa-users', routerLink: '/utenti'},
      { label: 'Richieste', icon: 'fa fa-clipboard', routerLink: '/richieste'}
    ];
  }
}
