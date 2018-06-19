import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../_api/models';
import { FilmService } from '../_api/services/film.service';

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
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification as Film[];
    }, error => {
      console.log(error);
    }
  );
  }

}
