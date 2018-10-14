import { FilmService } from '../_api/services/film.service';
import { Film } from '../_api/models/film';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-film',
  templateUrl: './dettaglio-film.component.html',
  styleUrls: ['./dettaglio-film.component.scss']
})
export class DettaglioFilmComponent {

  films: Film[] = [];
  showFilmDetails = false;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.filmService.getFilm(params.id).subscribe(notificationFilm => {
          this.films.push(notificationFilm);
          this.showFilmDetails = true;
        });
      } else {
        this.showFilmDetails = false;
      }
    });
  }

}
