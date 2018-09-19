import { SerieService } from '../_api/services/serie.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListItem, Serie } from '../_api/models';
import { Router } from '../../../node_modules/@angular/router';
import { Table } from '../../../node_modules/primeng/table';

@Component({
  selector: 'app-ricerca-serie-tv',
  templateUrl: './ricerca-serie-tv.component.html',
  styleUrls: ['./ricerca-serie-tv.component.scss']
})
export class RicercaSerieTvComponent implements OnInit {

  filters: any = {};

  serieTV: Serie[];

  cols: any[];

  formats: ListItem[];

  stagioneFilter: number;

  stagioneTimeout: any;

  @ViewChild('stvt') table: Table;

  constructor(
    private router: Router,
    private serieTVService: SerieService
  ) {

    this.formats = [
      { _id: '1', label: 'FULL-HD', value: 'FULL-HD' },
      { _id: '2', label: 'WEB', value: 'WEB' }
    ];

   }

  ngOnInit() {
    this.subsrcibeToListOfSerieTVs();
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'formato', header: 'Formato' },
      { field: 'linguaAudio', header: 'Audio' },
      { field: 'linguaSottotitoli', header: 'Sottotitoli' },
      { field: 'anno', header: 'Anno' },
      { field: 'numeroEpisodi', header: 'Episodi N°' },
      { field: 'numeroStagione', header: 'Stagione N°' }
    ];
  }

  subsrcibeToListOfSerieTVs() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      this.serieTV = notification;
    });
  }

  onFormatsFilterChange(val: ListItem[], table: Table) {
    table.filter(val, 'formato', 'filterFormats');
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(stvt: Table) {
    stvt.reset();
    this.filters = {};
    this.stagioneFilter = null;
  }

  //  *** Vado a visulizzare nel dattaglio la Serie TV selezionata ***
  goToSerie(serieId: string) {
    this.router.navigate(['filmStore/SerieTV/view', serieId]);
  }

  onStagioneChange(event, ft) {
    if (this.stagioneTimeout) {
        clearTimeout(this.stagioneTimeout);
    }

    this.stagioneTimeout = setTimeout(() => {
       ft.filter(event.value, 'numeroStagione', 'equals');
    }, 250);
}

}
