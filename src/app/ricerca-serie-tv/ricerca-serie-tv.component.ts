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

  serieTV: Serie[] = [];

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
      { field: 'nome', header: 'Titolo' }
    ];
  }

  subsrcibeToListOfSerieTVs() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      if (notification) {
        this.serieTV = notification;
      }
    });
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

}
