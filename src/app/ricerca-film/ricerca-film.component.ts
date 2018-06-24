import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Film } from '../_api/models';
import { FilmService } from '../_api/services/film.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-ricerca-film',
  templateUrl: './ricerca-film.component.html',
  styleUrls: ['./ricerca-film.component.scss']
})
export class RicercaFilmComponent implements OnInit {

  filters: any = {};

  films: Film[];

  cols: any[];

  constructor(
    private router: Router,
    private filmService: FilmService
  ) {

   }

  ngOnInit() {
    this.subsrcibeToListOfFilms();
    this.getColumns();
  }

  click() {
    this.router.navigate(['/home']);
  }

  getColumns() {
    this.cols = [
      { field: '_id', header: 'ID' },
      { field: 'nome', header: 'Nome' },
      { field: 'formato', header: 'Formato' }
  ];
  }

  subsrcibeToListOfFilms() {
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification as Film[];
    }, error => {
      console.log(error);
    }
  );
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(tr: Table) {
    tr.reset();
    this.filters = {};
  }

}
