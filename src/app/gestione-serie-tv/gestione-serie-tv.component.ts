import { SerieService } from './../_api/services/serie.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Serie } from '../_api/models';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-gestione-serie-tv',
  templateUrl: './gestione-serie-tv.component.html',
  styleUrls: ['./gestione-serie-tv.component.scss']
})
export class GestioneSerieTvComponent implements OnInit {

  serieSelezionata: Serie;

  serie: Serie[];

  singolaSerie: Serie = { _id: null };

  showSerie = false;

  cols: any[];

  formats: SelectItem[];

  newSerie: boolean;

  displayDialog: boolean;

  @ViewChild('rt') rt: Table;

  constructor(
    private serieService: SerieService
  ) {

    this.formats = [
      { label: '', value: '' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'WEB', value: 'WEB' }
    ];
  }

  ngOnInit() {
    this.subsrcibeToListOfSerie();
    this.getCols();
  }

  getCols() {
    this.cols = [
      {
        field: 'nome',
        header: 'Nome Serie TV',
      },
      {
        field: 'numeroStagione',
        header: 'Numero Della Stagione'
      },
      {
        field: 'formato',
        header: 'Formato'
      }
    ];
  }

  subsrcibeToListOfSerie() {
    this.serieService.getSerieTVs().subscribe(notification => {
      this.serie = notification;
      this.showSerie = true;
    }, error => {
      this.showSerie = true;
    }
    );
  }

  onRowSelect(event) {
    this.newSerie = false;
    this.singolaSerie = this.cloneSerie(event.data);
    this.displayDialog = true;
  }

  cloneSerie(r: Serie): Serie {
    const ric = { _id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.newSerie = true;
    this.singolaSerie = { _id: null };
    this.displayDialog = true;
  }

  save() {
    if (this.newSerie) {
      this.serieService.addSerie(this.singolaSerie).subscribe(response => {
        if (response !== null) {
          this.serie = response as Serie[];
          this.singolaSerie = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
    } else {
      this.serieService.updateSerie(this.singolaSerie).subscribe(response => {
        if (response !== null) {
          this.serie = response as Serie[];
          this.singolaSerie = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
    }
  }

  delete() {
      this.serieService.deleteSerie(this.serieSelezionata._id).subscribe(response => {
        if (response !== null) {
          const index = this.serie.indexOf(this.serieSelezionata);
          this.serie = this.serie.filter((val, i) => i !== index);
          this.singolaSerie = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
  }

  close() {
    this.displayDialog = false;
  }


}
