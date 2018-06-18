import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../_api/services/film.service';
import { Film } from '../_api/models';

@Component({
  selector: 'app-ricerca-film',
  templateUrl: './ricerca-film.component.html',
  styleUrls: ['./ricerca-film.component.css']
})
export class RicercaFilmComponent implements OnInit {

  films: Film[];

  constructor(
    private router: Router,
    private filmService: FilmService
  ) {

   }

  ngOnInit() {
    this.subsrcibeToListOfFilms();
  }

  click() {
    this.router.navigate(['/home']);
  }

  subsrcibeToListOfFilms() {
    this.filmService.getFilms().then(notification => {
      this.films = notification as Film[];
    });
  }

}
