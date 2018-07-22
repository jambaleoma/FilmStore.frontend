import { FilmService } from './../_api/services/film.service';
import { Film } from './../_api/models/film';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dettaglio-film',
  templateUrl: './dettaglio-film.component.html',
  styleUrls: ['./dettaglio-film.component.scss']
})
export class DettaglioFilmComponent implements OnInit {

  film: Film[];
  filmIdRicercato: string;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.filmIdRicercato = params.id;
        console.log(this.filmIdRicercato);
      }
    });
  }

  ngOnInit(): void {
    this.filmService.getFilm(this.filmIdRicercato).subscribe(notificationFilm => {
      this.film = notificationFilm;
      console.log(this.film);
    });
  }

}
