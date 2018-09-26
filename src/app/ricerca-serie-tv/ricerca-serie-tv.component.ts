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
      { field: 'nome', header: 'Titolo' },
      { field: 'formato', header: 'Formato' },
      { field: 'anno', header: 'Anno' },
      { field: 'stagioni', header: 'Stagioni' }
    ];
  }

  subsrcibeToListOfSerieTVs() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      if (notification) {
        const seriesName = this.groupBy(notification, serie => serie.nome);
        const arrayOfName = Array.from(seriesName.keys());
        for (const name of arrayOfName) {
          seriesName.get(name).sort(function (a, b) {
            return (a.numeroStagione - b.numeroStagione);
          });
          this.serieTV.push(seriesName.get(name)[0]);
        }
      }
    });
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
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
