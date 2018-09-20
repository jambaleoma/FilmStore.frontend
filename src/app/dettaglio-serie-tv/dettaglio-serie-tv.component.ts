import { SerieService } from './../_api/services/serie.service';
import { Serie } from './../_api/models/serie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-serie-tv',
  templateUrl: './dettaglio-serie-tv.component.html',
  styleUrls: ['./dettaglio-serie-tv.component.scss']
})
export class DettaglioSerieTvComponent {

  serie: Serie;
  showSerieDetails = false;

  constructor(
    private route: ActivatedRoute,
    private serieTVService: SerieService
  ) {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.serieTVService.getSerie(params.id).subscribe(notificationFilm => {
          this.serie = notificationFilm;
          this.showSerieDetails = true;
        });
      } else {
        this.showSerieDetails = false;
      }
    });
  }

}
