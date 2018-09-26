import { SerieService } from './../_api/services/serie.service';
import { Serie } from './../_api/models/serie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-serie-tv',
  templateUrl: './dettaglio-serie-tv.component.html',
  styleUrls: ['./dettaglio-serie-tv.component.scss']
})
export class DettaglioSerieTvComponent implements OnInit {

  series: Serie[] = [];
  serie: Serie;
  showSerieDetails = false;
  selectedSerie: Serie;
  displayDialog: boolean;

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

  ngOnInit() {
    this.subscribeListOfSerieTV();
  }

  subscribeListOfSerieTV() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      this.series = notification.filter((val) => val.nome === this.serie.nome);
      this.series.sort(function (a, b) {
        return (a.numeroStagione - b.numeroStagione);
      });
    });
  }

  selectSerie(event: Event, serie: Serie) {
    this.selectedSerie = serie;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
    this.selectedSerie = null;
  }

}
