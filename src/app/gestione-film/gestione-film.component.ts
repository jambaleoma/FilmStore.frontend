import { Film } from './../_api/models/film';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { SelectItem, Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FilmService } from '../_api/services/film.service';
import { ListItem } from '../_api/models';

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

  filters: any = {};

  yearTimeout: any;

  yearFilter: number;

  cols: any[];

  formats: SelectItem[];

  msgs: Message[] = [];

  newFilm: boolean;

  displayDialog: boolean;

  audios: ListItem[] = [];

  @ViewChild('rt') rt: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private filmService: FilmService,
    private renderer: Renderer2
  ) {

    this.audios = [
      {
        _id: 'CHN',
        label: 'CHN',
        value: 'CHN'
      },
      {
        _id: 'KOR',
        label: 'KOR',
        value: 'KOR'
      },
      {
        _id: 'ENG',
        label: 'ENG',
        value: 'ENG'
      },
      {
        _id: 'ESP',
        label: 'ESP',
        value: 'ESP'
      },
      {
        _id: 'FIN',
        label: 'FIN',
        value: 'FIN'
      },
      {
        _id: 'FRA',
        label: 'FRA',
        value: 'FRA'
      },
      {
        _id: 'ITA',
        label: 'ITA',
        value: 'ITA'
      },
      {
        _id: 'NLD',
        label: 'NLD',
        value: 'NLD'
      },
      {
        _id: 'JPN',
        label: 'JPN',
        value: 'JPN'
      },
      {
        _id: 'NOR',
        label: 'NOR',
        value: 'NOR'
      },
      {
        _id: 'POL',
        label: 'POL',
        value: 'POL'
      },
      {
        _id: 'PRT',
        label: 'PRT',
        value: 'PRT'
      },
      {
        _id: 'SWE',
        label: 'SWE',
        value: 'SWE'
      }
    ];

    this.formats = [
      { label: '', value: '' },
      { label: '4K', value: '4K' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' }
    ];
  }

  private checkCountries() {
    if (this.film && (!this.film.linguaAudio)) {
      this.film.linguaAudio = this.audios.map((va: ListItem) => va.value);
    }
  }

  ngOnInit() {
    this.subsrcibeToListOfFilm();
    this.getCols();
  }

  getCols() {
    this.cols = [
      { field: 'nome', header: 'Titolo' },
      { field: 'anno', header: 'Anno' },
      { field: 'formato', header: 'Formato' },
      { field: 'linguaAudio', header: 'Audio' },
      { field: 'linguaSottotitoli', header: 'Sottotitoli' }
    ];
  }

  subsrcibeToListOfFilm() {
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification;
      // TODO: modify BE model of film.linguaAudio & film.linguaSottotitoli
      // for (let film of this.films) {
      //   film.linguaAudio.
      // }
      this.checkCountries();
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
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
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
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  save() {
    if (this.newFilm) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questo Film?',
        header: 'Inserimento Film',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filmService.addFilm(this.film).subscribe(response => {
            if (response !== null) {
              this.films = response as Film[];
              this.film = null;
              this.displayDialog = false;
              this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Film Inserito' }];
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questo Film?',
        header: 'Aggiornamento Film',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.filmService.updateFilm(this.film).subscribe(response => {
            if (response !== null) {
              this.films = response as Film[];
              this.film = null;
              this.displayDialog = false;
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Film Aggiornato' }];
            }
          });
        },
        reject: () => { }
      });
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questo Film?',
      header: 'Eliminazione Film',
      icon: 'fa fa-trash',
      accept: () => {
        this.filmService.deleteFilm(this.filmSelezionato._id).subscribe(response => {
          if (response !== null) {
            const index = this.films.indexOf(this.filmSelezionato);
            this.films = this.films.filter((val, i) => i !== index);
            this.film = null;
            this.displayDialog = false;
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Film Eliminato' }];
          }
        });
      },
      reject: () => { }
    });
  }

  close() {
    this.displayDialog = false;
  }

  onYearChange(event, ft) {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      ft.filter(event.value - 1, 'anno', 'gt');
    }, 250);
  }

  reset(rt: Table) {
    rt.reset();
    this.filters = {};
    this.yearFilter = null;
  }

  deleteAudio(film: Film) {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare l\'Audio di questo Film?',
      header: 'Eliminazione Film',
      icon: 'fa fa-trash',
      accept: () => {
        this.filmService.deleteAudioFilm(film._id).subscribe(response => {
          if (response !== null) {
            this.films = response as Film[];
            this.film = null;
            this.displayDialog = false;
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Audio Film Eliminato' }];
          }
        });
      },
      reject: () => { }
    });
  }

}
