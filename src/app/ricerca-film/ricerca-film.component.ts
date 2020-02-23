import { Film } from '../_api/models/film';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../_api/services/film.service';
import { Table } from 'primeng/table';
import { ListItem } from '../_api/models/list-items';
import { ApplicationService } from '../_service/application.service';

@Component({
  selector: 'app-ricerca-film',
  templateUrl: './ricerca-film.component.html',
  styleUrls: ['./ricerca-film.component.scss']
})
export class RicercaFilmComponent implements OnInit {

  filters: any = {};

  films: Film[];

  filmsByCategory: Film[];

  cols: any[];

  formats: ListItem[];

  category: ListItem[];

  currentOlderYearFilm: number[];

  maxYear: number;

  minYear: number;

  yearFilter: number;

  yearTimeout: any;

  blockedDocument = false;

  loadingComplete = false;

  @ViewChild('ft') table: Table;

  constructor(
    private router: Router,
    private filmService: FilmService,
    private applicationService: ApplicationService,
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
    this.subscribeToCurrentOlderYearFillms();
    this.subscribeToListOfCategory();
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'anno', header: 'Anno' },
      { field: 'formato', header: 'Formato' },
      {
        field: 'categoria',
        header: 'Categoria',
        renderer: (row: Film) => {
          if (row.categoria) {
            return row.categoria.join(', ');
          } else {
            return '-';
          }
        }
      }
    ];
  }

  subsrcibeToListOfFilms() {
    this.blockDocument();
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification;
      this.unBlockDocument();
      this.loadingComplete = true;
    });
  }

  subscribeToCurrentOlderYearFillms() {
    this.filmService.getOlderYearFilms().subscribe( notification => {
      this.currentOlderYearFilm = notification.split('-').map((year) => {
        return parseInt(year, 10);
      });
      this.minYear = this.currentOlderYearFilm[0];
      this.maxYear = this.currentOlderYearFilm[1];
    });
  }

  subscribeToListOfCategory() {
    this.applicationService.categoriesObservable.subscribe(notification => {
      this.category = notification;
    });
  }

  blockDocument() {
    this.blockedDocument = true;
  }

  unBlockDocument() {
    this.blockedDocument = false;
  }

  findForCategory(category: string[], ft: Table) {
    this.blockDocument();
    if (category[0]) {
      this.films = [];
      this.filmService.getFilms().subscribe(notification => {
        if (notification) {
          this.unBlockDocument();
          for (const singleCategory of category) {
            this.filmsByCategory = notification.filter(film => film.categoria.includes(singleCategory));
            this.filmsByCategory.forEach(film => {
              if (!this.films.includes(film)) {
                this.films.push(film);
              }
            });
          }
          ft.reset();
        }
      });
    } else {
      this.subsrcibeToListOfFilms();
    }
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(ft: Table) {
    ft.reset();
    this.filters = {};
    this.yearFilter = null;
    this.subsrcibeToListOfFilms();
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
