import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router
  ) {}

  customerfirstName = sessionStorage.getItem('customerfirstName');

  goToSerieTv() {
    this.router.navigate(['/ricercaSerieTV']);
  }

  goToFilms() {
    this.router.navigate(['/ricercaFilm']);
  }

  goToRicheiste() {
    this.router.navigate(['/richieste']);
  }
}
