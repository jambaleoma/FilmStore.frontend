import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showSerieTvAdminDialog = false;

  constructor(
    private router: Router
  ) { }

  customerfirstName = sessionStorage.getItem('customerfirstName');

  goToSerieTv() {
    this.router.navigate(['/ricercaSerieTV']);
  }

  goToSerieTvOnAdminMode() {
    this.router.navigate(['/gestioneSerieTV']);
  }

  goToFilms() {
    this.router.navigate(['/ricercaFilm']);
  }

  goToFilmsOnAdminMode() {
    this.router.navigate(['/gestioneFilm']);
  }

  goToRicheiste() {
    this.router.navigate(['/richieste']);
  }

  goToRicheisteOnAdminMode() {
    this.router.navigate(['/richieste']);
  }
}
