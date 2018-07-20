import { Film } from './../_api/models/film';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dettaglio-film',
  templateUrl: './dettaglio-film.component.html',
  styleUrls: ['./dettaglio-film.component.scss']
})
export class DettaglioFilmComponent {

  film: Film;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
      }
    });
   }

}
