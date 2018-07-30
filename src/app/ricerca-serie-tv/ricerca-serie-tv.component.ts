import { SerieTVService } from './../_api/services/serieTV.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListItem, SerieTV } from '../_api/models';
import { Router } from '../../../node_modules/@angular/router';
import { Table } from '../../../node_modules/primeng/table';

@Component({
  selector: 'app-ricerca-serie-tv',
  templateUrl: './ricerca-serie-tv.component.html',
  styleUrls: ['./ricerca-serie-tv.component.scss']
})
export class RicercaSerieTvComponent implements OnInit {

  filters: any = {};

  serieTV: SerieTV[];

  cols: any[];

  formats: ListItem[];

  stagioneFilter: number;

  stagioneTimeout: any;

  @ViewChild('stvt') table: Table;

  constructor(
    private router: Router,
    private serieTVService: SerieTVService
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
      { field: 'nome', header: 'Nome' },
      { field: 'numeroStagione', header: 'Stagione N°' },
      { field: 'formato', header: 'Formato' },
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

  onStagioneChange(event, ft) {
    if (this.stagioneTimeout) {
        clearTimeout(this.stagioneTimeout);
    }

    this.stagioneTimeout = setTimeout(() => {
       ft.filter(event.value, 'numeroStagione', 'equals');
    }, 250);
}

}
