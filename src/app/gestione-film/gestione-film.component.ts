import { Film } from './../_api/models/film';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilmService } from '../_api/services/film.service';

@Component({
  selector: 'app-gestione-film',
  templateUrl: './gestione-film.component.html',
  styleUrls: ['./gestione-film.component.scss']
})
export class GestioneFilmComponent implements OnInit {

  filmSelezionato: Film;

  films: Film[];

  film: Film = { _id: null };

  showFilm = false;

  cols: any[];

  formats: SelectItem[];

  newFilm: boolean;

  displayDialog: boolean;

  @ViewChild('rt') rt: Table;

  constructor(
    private filmService: FilmService
  ) {

    this.formats = [
      { label: '', value: '' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' }
    ];
  }

  ngOnInit() {
    this.subsrcibeToListOfFilm();
    this.getCols();
  }

  getCols() {
    this.cols = [
      {
        field: 'nome',
        header: 'Nome Film',
      },
      {
        field: 'formato',
        header: 'Formato del Film'
      },
      {
        field: 'anno',
        header: 'Usicta del Film'
      }
    ];
  }

  subsrcibeToListOfFilm() {
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification;
      this.showFilm = true;
    }, error => {
      this.showFilm = true;
    }
    );
  }

  onRowSelect(event) {
    this.newFilm = false;
    this.film = this.cloneFilm(event.data);
    this.displayDialog = true;
  }

  cloneFilm(r: Film): Film {
    const ric = { _id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.newFilm = true;
    this.film = { _id: null };
    this.displayDialog = true;
  }

  save() {
    if (this.newFilm) {
      this.filmService.addFilm(this.film).subscribe(response => {
        if (response !== null) {
          this.films = response as Film[];
          this.film = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
    } else {
      this.filmService.updateFilm(this.film).subscribe(response => {
        if (response !== null) {
          this.films = response as Film[];
          this.film = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
    }
  }

  delete() {
      this.filmService.deleteFilm(this.filmSelezionato._id).subscribe(response => {
        if (response !== null) {
          const index = this.films.indexOf(this.filmSelezionato);
          this.films = this.films.filter((val, i) => i !== index);
          this.film = null;
          this.displayDialog = false;
          this.rt.reset();
        }
      });
  }

  close() {
    this.displayDialog = false;
  }


}
