import { Voto } from './../_api/models/voto';
import { VotoService } from './../_api/services/voto.service';
import { Stagione } from './../_api/models/stagione';
import { FilmService } from './../_api/services/film.service';
import { Component } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models/richiesta';
import { CustomerService } from '../_api/services/customer.service';
import { RichiestaService } from '../_api/services/richiesta.service';
import { Film } from '../_api/models/film';
import { StagioneService } from '../_api/services/stagione.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent {

  customers: Customer[] = [];

  richieste: Richiesta[] = [];

  films: Film[] = [];

  stagioni: Stagione[] = [];

  voti: Voto[] = [];

  cols: any[];

  dataPieRichieste: any;

  dataLineRichieste: any;

  dataPolarRichieste: any;

  dataLineFilm: any;

  dataDoughnutFilm: any;

  dataBarSerieTV: any;

  statiRichiesta: string[] = ['COMPLETATA', 'IN LAVORAZIONE', 'PRESA IN CARICO', 'RIFIUTATA'];

  anniRichieste: string[] = [];

  mesiAnno: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
    'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  formatiFilms: string[] = [];

  filmsFormati: number[] = [];

  anniFilms: number[] = [];

  filmsAnni: number[] = [];

  formatiSerieTV: string[] = [];

  serieTVFormati: number[] = [];

  stato2richieste: Map<string, number> = new Map;

  anno2_mese2richieste: Map<string, number[]> = new Map;

  customer2richieste: Map<string, number> = new Map;

  formato2film: Map<string, number> = new Map;

  anno2film: Map<number, number> = new Map;

  formato2serieTV: Map<string, number> = new Map;

  constructor(
    private customerService: CustomerService,
    private richiestaService: RichiestaService,
    private filmService: FilmService,
    private stagioneService: StagioneService,
    private votoService: VotoService
  ) {

    this.cols = [
      { field: 'nomeFilm', header: 'Film' },
      { field: 'firstNameCustomer', header: 'Nome Utente' },
      { field: 'lastNameCustomer', header: 'Cognome Utente' },
      { field: 'dataCreazioneVoto', header: 'Data Creazione Voto' },
      {
        field: 'votazione',
        header: 'Voto',
        renderer: (row: Voto) => {
          if (row.votazione) {
            return row.votazione + ' / 10';
          } else {
            return '-';
          }
        }
      },
      {
        field: 'like',
        header: 'Gradimento',
        renderer: (row: Voto) => {
          if (row.like === true) {
            return '<i class="fa fa-thumbs-o-up" aria-hidden="true"></i>';
          } else if (row.like === false) {
            return '<i class="fa fa-thumbs-o-down" aria-hidden="true"></i>';
          } else {
            return '-';
          }
        }
      }
    ];

    this.getRichiesteForStatistics();
    this.subsrcibeToListOfRichieste();
    this.subsrcibeToListOfVoti();
    this.subsrcibeToListOfCustomers();
    this.subsrcibeToListOfFilms();
    this.subsrcibeToListOfStagioni();
  }

  getRichiesteForStatistics() {
    this.richiestaService.getRichiesteYearForStatistics().subscribe(notificationYear => {
      if (notificationYear) {
        this.anniRichieste = notificationYear;
        for (const anno of this.anniRichieste) {
          this.richiestaService.getRichiesteForStatistics(anno).subscribe(notification => {
            if (notification) {
              this.anno2_mese2richieste.set(anno, notification);
            }
            this.loadChartRichiestePerMeseLine();
          });
        }
      }
    });
  }

  subsrcibeToListOfRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      if (notification) {
        this.richieste = notification;
        if (this.richieste.length > 0) {
          for (const richiesta of this.richieste) {
            if (this.stato2richieste.has(richiesta.stato)) {
              this.stato2richieste.set(richiesta.stato, this.stato2richieste.get(richiesta.stato) + 1);
            } else {
              this.stato2richieste.set(richiesta.stato, 1);
            }
          }
          this.loadChartStatoRichiestePolar();
        }
      }
    });
  }

  subsrcibeToListOfVoti() {
    this.votoService.getVoti().subscribe(notificationVoti => {
      this.voti = notificationVoti.filter(voto => voto.votazione || voto.like);
    });
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      if (notification) {
        this.customers = notification;
        if (this.customers.length > 0) {
          for (let i = 0; i < this.customers.length; i++) {
            this.customer2richieste.set(this.customers[i].firstName, this.customers[i].numeroRichieste);
          }
          this.loadChartCustomerRichiestePie();
        }
      }
    });
  }

  loadChartRichiestePerMeseLine() {
    if (this.anniRichieste.length > 0) {
      const dataLineRichiesteLabel = [];
      const dataLineRichiesteData = [];
      const dataLineRichiestebackgroundColor = [];
      for (const anno of this.anniRichieste) {
        dataLineRichiesteLabel.push('Richieste nel ' + anno);
        dataLineRichiesteData.push(this.anno2_mese2richieste.get(anno));
        dataLineRichiestebackgroundColor.push(this.getRandomColor());
      }
      this.dataLineRichieste = {
        labels: this.mesiAnno,
        datasets: [
          {
            label: dataLineRichiesteLabel[0],
            data: dataLineRichiesteData[0],
            fill: false,
            borderColor: dataLineRichiestebackgroundColor[0],
            backgroundColor: dataLineRichiestebackgroundColor[0]
          },
          {
            label: dataLineRichiesteLabel[1],
            data: dataLineRichiesteData[1],
            fill: false,
            borderColor: dataLineRichiestebackgroundColor[1],
            backgroundColor: dataLineRichiestebackgroundColor[1]
          }
        ]
      };
    }
  }

  loadChartCustomerRichiestePie() {
    if (this.customers.length > 0) {
      const dataPieRichiesteLabels = [];
      const dataPieRichiesteData = [];
      const dataPieRichiestebackgroundColor = [];
      for (const customer of this.customers) {
        if (this.customer2richieste.get(customer.firstName) !== 0) {
          dataPieRichiesteLabels.push('Richieste di ' + customer.firstName);
          dataPieRichiesteData.push(this.customer2richieste.get(customer.firstName));
          dataPieRichiestebackgroundColor.push(this.getRandomColor());
        }
      }
      this.dataPieRichieste = {
        labels: dataPieRichiesteLabels,
        datasets: [
          {
            data: dataPieRichiesteData,
            backgroundColor: dataPieRichiestebackgroundColor,
            hoverBackgroundColor: dataPieRichiestebackgroundColor
          }
        ]
      };
    }
  }

  loadChartStatoRichiestePolar() {
    if (this.richieste.length > 0) {
      const dataPolarRichiesteLabel = [];
      const dataPolarRichiesteData = [];
      const dataPolarRichiestebackgroundColor = [];
      for (const stato of this.statiRichiesta) {
        dataPolarRichiesteLabel.push('STATO ' + stato);
        dataPolarRichiesteData.push(this.stato2richieste.get(stato) ? this.stato2richieste.get(stato) : 0);
        dataPolarRichiestebackgroundColor.push(this.getRandomColor());
      }
      this.dataPolarRichieste = {
        labels: dataPolarRichiesteLabel,
        datasets: [
          {
            data: dataPolarRichiesteData,
            backgroundColor: dataPolarRichiestebackgroundColor
          }
        ]
      };
    }
  }

  subsrcibeToListOfFilms() {
    this.filmService.getFilms().subscribe(notification => {
      this.films = notification;
      const unsortedFilmMap = new Map();
      for (const film of this.films) {
        if (unsortedFilmMap.has(film.anno)) {
          unsortedFilmMap.set(film.anno, unsortedFilmMap.get(film.anno) + 1);
        } else {
          unsortedFilmMap.set(film.anno, 1);
        }
        if (this.formato2film.has(film.formato)) {
          this.formato2film.set(film.formato, this.formato2film.get(film.formato) + 1);
        } else {
          this.formato2film.set(film.formato, 1);
        }
      }
      this.anniFilms = Array.from(unsortedFilmMap.keys());
      this.formatiFilms = Array.from(this.formato2film.keys());
      this.filmsFormati = Array.from(this.formato2film.values());
      this.anniFilms.sort();
      for (const annofilm of this.anniFilms) {
        this.anno2film.set(annofilm, unsortedFilmMap.get(annofilm));
      }
      this.filmsAnni = Array.from(this.anno2film.values());
      this.loadChartFilmsPerFormatoDoughnut();
      this.loadChartFilmsPerAnnoLine();
    });
  }

  loadChartFilmsPerFormatoDoughnut() {
    if (this.films.length > 0) {
      const dataDoughnutFilmLabels = [];
      const dataDoughnutFilmbackgroundColor = [];
      for (const formato of this.formatiFilms) {
        dataDoughnutFilmLabels.push('Film in Formato ' + formato);
        dataDoughnutFilmbackgroundColor.push(this.getRandomColor());
      }
      this.dataDoughnutFilm = {
        labels: dataDoughnutFilmLabels,
        datasets: [
          {
            data: this.filmsFormati,
            backgroundColor: dataDoughnutFilmbackgroundColor,
            hoverBackgroundColor: dataDoughnutFilmbackgroundColor
          }]
      };
    }
  }

  loadChartFilmsPerAnnoLine() {
    if (this.films.length > 0) {
      const dataLineRichiestebackgroundColor = this.getRandomColor();
      this.dataLineFilm = {
        labels: this.anniFilms,
        datasets: [
          {
            label: 'Film per Anno',
            data: this.filmsAnni,
            fill: false,
            backgroundColor: dataLineRichiestebackgroundColor,
            borderColor: dataLineRichiestebackgroundColor
          }
        ]
      };
    }
  }

  subsrcibeToListOfStagioni() {
    this.stagioneService.getStagioni().subscribe(notification => {
      this.stagioni = notification;
      for (const stagione of this.stagioni) {
        if (this.formato2serieTV.has(stagione.formato)) {
          this.formato2serieTV.set(stagione.formato, this.formato2serieTV.get(stagione.formato) + 1);
        } else {
          this.formato2serieTV.set(stagione.formato, 1);
        }
      }
      this.formatiSerieTV = Array.from(this.formato2serieTV.keys());
      this.serieTVFormati = Array.from(this.formato2serieTV.values());
      this.loadChartFormatiSerieTVBar();
    });
  }

  loadChartFormatiSerieTVBar() {
    if (this.stagioni.length > 0) {
      const dataBarRichiestebackgroundColor = [];
      for (const formato of this.formatiSerieTV) {
        dataBarRichiestebackgroundColor.push(this.getRandomColor());
      }
      this.dataBarSerieTV = {
        labels: ['Formato Stagione'],
        datasets: [
          {
            label: this.formatiSerieTV[0],
            backgroundColor: dataBarRichiestebackgroundColor[0],
            borderColor: dataBarRichiestebackgroundColor[0],
            data: [this.serieTVFormati[0], 0]
          },
          {
            label: this.formatiSerieTV[1],
            backgroundColor: dataBarRichiestebackgroundColor[1],
            borderColor: dataBarRichiestebackgroundColor[1],
            data: [this.serieTVFormati[1], 0]
          }
        ]
      };
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
