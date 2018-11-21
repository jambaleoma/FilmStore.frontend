import { Film } from '../_api/models/film';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../_api/services/film.service';
import { Table } from 'primeng/table';
import { ListItem } from '../_api/models/list-items';

@Component({
  selector: 'app-ricerca-film',
  templateUrl: './ricerca-film.component.html',
  styleUrls: ['./ricerca-film.component.scss']
})
export class RicercaFilmComponent implements OnInit {

  filters: any = {};

  films: Film[];

  cols: any[];

  formats: ListItem[];

  yearFilter: number;

  yearTimeout: any;

  @ViewChild('ft') table: Table;

  constructor(
    private router: Router,
    private filmService: FilmService
  ) {

    this.formats = [
      { _id: '0', label: '4K', value: '4K' },
      { _id: '1', label: 'FULL-HD', value: 'FULL-HD' },
      { _id: '2', label: 'HD', value: 'HD' },
      { _id: '3', label: 'DVD', value: 'DVD' }
    ];

  }

  ngOnInit() {
    this.subsrcibeToListOfFilms();
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'linguaAudio', header: 'Audio' },
      { field: 'linguaSottotitoli', header: 'Sottotitoli' },
      { field: 'anno', header: 'Anno' },
      { field: 'formato', header: 'Formato' }
    ];
  }

  subsrcibeToListOfFilms() {
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification;
    });
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(tr: Table) {
    tr.reset();
    this.filters = {};
    this.yearFilter = null;
  }

  //  *** Vado a visulizzare nel dattaglio il film selezionato ***
  goToFilm(filmId: string) {
    this.router.navigate(['filmStore/Film/view', filmId]);
  }

  onYearChange(event, ft) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      ft.filter(event.value - 1, 'anno', 'gt');
    }, 250);
  }

}
