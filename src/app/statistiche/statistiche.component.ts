import { SerieTV } from './../_api/models/serieTV';
import { SerieTVService } from './../_api/services/serieTV.service';
import { FilmService } from './../_api/services/film.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models/richiesta';
import { CustomerService } from '../_api/services/customer.service';
import { RichiestaService } from '../_api/services/richiesta.service';
import { Film } from '../_api/models/film';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit {

  customers: Customer[] = [];

  richieste: Richiesta[];

  films: Film[] = [];

  serieTV: SerieTV[] = [];

  dataPieRichieste: any;

  dataLineRichieste: any;

  // dataBarRichieste: any;

  dataLineFilm: any;

  dataDoughnutFilm: any;

  dataBarSerieTV: any;

  richiestaMese: number[] = [];

  mesiAnno: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
    'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

  richiestePerNomeUtente: Richiesta[];

  formatiFilms: string[] = [];

  filmsFormati: number[] = [];

  anniFilms: number[] = [];

  filmsAnni: number[] = [];

  formatiSerieTV: string[] = [];

  serieTVFormati: number[] = [];

  mese2richieste: Map<string, number> = new Map;

  customer2richieste: Map<string, number> = new Map;

  formato2film: Map<string, number> = new Map;

  anno2film: Map<number, number> = new Map;

  formato2serieTV: Map<string, number> = new Map;

  constructor(
    private customerService: CustomerService,
    private richiestaService: RichiestaService,
    private filmService: FilmService,
    private serieTVService: SerieTVService
  ) { }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
    this.subsrcibeToListOfFilms();
    this.subsrcibeToListOfSerieTVs();
    this.getRichieste();
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customers = notification;
      this.getRichiesteOfCustomers();
    });
  }

  getRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      for (const meseAnno of this.mesiAnno) {
        this.mese2richieste.set(meseAnno, 0);
      }
      for (const richiesta of this.richieste) {
        const meseRichiesta = richiesta.dataInserimento.split(' ');
        const mese = meseRichiesta[2];
        if (this.mese2richieste.has(mese)) {
          this.mese2richieste.set(mese, this.mese2richieste.get(mese) + 1);
        } else {
          this.mese2richieste.set(mese, 1);
        }
      }
      this.richiestaMese = Array.from(this.mese2richieste.values());
    });
  }

  getRichiesteOfCustomers() {
    if (this.customers.length > 0) {
      for (let i = 0; i < this.customers.length; i++) {
        this.richiestaService.getRichiesteByCustomerName(this.customers[i].firstName).subscribe(notification => {
          this.richiestePerNomeUtente = notification;
          this.customers[i].numeroRichieste = this.richiestePerNomeUtente.length;
          this.customer2richieste.set(this.customers[i].firstName, this.customers[i].numeroRichieste);
          this.loadChartRichiestePerMeseLine();
          this.loadChartCustomerRichiestePie();
          // this.loadChartCustomerRichiesteBar();
        });
      }
    }
  }

  loadChartRichiestePerMeseLine() {
    if (this.customers.length > 0) {
      this.dataLineRichieste = {
        labels: this.mesiAnno,
        datasets: [
          {
            label: 'Richieste nel 2018',
            data: this.richiestaMese,
            fill: false,
            borderColor: '#4bc0c0',
            backgroundColor: '#4bc0c0'
          }
        ]
      };
    }
  }

  loadChartCustomerRichiestePie() {
    if (this.customers.length > 0) {
      this.dataPieRichieste = {
        labels: ['Richieste di ' + this.customers[0].firstName,
                 'Richieste di ' + this.customers[1].firstName,
                 'Richieste di ' + this.customers[2].firstName,
                 'Richieste di ' + this.customers[3].firstName],
        datasets: [
          {
            data: [this.customer2richieste.get(this.customers[0].firstName), this.customer2richieste.get(this.customers[1].firstName),
            this.customer2richieste.get(this.customers[2].firstName), this.customer2richieste.get(this.customers[3].firstName)],
            backgroundColor: [
              '#f70236',
              '#36A2EB',
              '#FFCE56',
              '#427F31'
            ],
            hoverBackgroundColor: [
              '#f70236',
              '#36A2EB',
              '#FFCE56',
              '#427F31'
            ]
          }]
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

  subsrcibeToListOfSerieTVs() {
    this.serieTVService.getSerieTVs().subscribe(notification => {
      this.serieTV = notification;
      for (const serietv of this.serieTV) {
        if (this.formato2serieTV.has(serietv.formato)) {
          this.formato2serieTV.set(serietv.formato, this.formato2serieTV.get(serietv.formato) + 1);
        } else {
          this.formato2serieTV.set(serietv.formato, 1);
        }
      }
      this.formatiSerieTV = Array.from(this.formato2serieTV.keys());
      this.serieTVFormati = Array.from(this.formato2serieTV.values());
      this.loadChartFormatiSerieTVBar();
    });
  }

  // loadChartCustomerRichiesteBar() {
  //   if (this.customers.length > 0) {
  //     this.dataBarRichieste = {
  //       datasets: [
  //         {
  //           data: [this.customer2richieste.get(this.customers[0].firstName)],
  //           fill: false,
  //           backgroundColor: '#FF6384',
  //           hoverBackgroundColor: '#FF6384',
  //           label: this.customers[0].firstName
  //         },
  //         {
  //           data: [this.customer2richieste.get(this.customers[1].firstName)],
  //           fill: false,
  //           backgroundColor: '#36A2EB',
  //           hoverBackgroundColor: '#36A2EB',
  //           label: this.customers[1].firstName
  //         },
  //         {
  //           data: [this.customer2richieste.get(this.customers[2].firstName)],
  //           fill: false,
  //           backgroundColor: '#FFCE56',
  //           hoverBackgroundColor: '#FFCE56',
  //           label: this.customers[2].firstName
  //         },
  //         {
  //           data: [this.customer2richieste.get(this.customers[3].firstName)],
  //           fill: false,
  //           backgroundColor: '#427F31',
  //           hoverBackgroundColor: '#427F31',
  //           label: this.customers[3].firstName
  //         },
  //         {
  //           data: [0],
  //           label: '',
  //           backgroundColor: 'white',
  //           hoverBackgroundColor: 'white'
  //         }
  //       ]
  //     };
  //   }
  // }

  loadChartFilmsPerFormatoDoughnut() {
    if (this.films.length > 0) {
      this.dataDoughnutFilm = {
        labels: ['Film in Formato ' + this.formatiFilms[0],
                 'Film in Formato ' + this.formatiFilms[1],
                 'Film in Formato ' + this.formatiFilms[2]],
        datasets: [
          {
            data: this.filmsFormati,
            backgroundColor: [
              '#006000',
              '#E10000',
              '#0020C2'
            ],
            hoverBackgroundColor: [
              '#006000',
              '#E10000',
              '#0020C2'
            ]
          }]
      };
    }
  }

  loadChartFilmsPerAnnoLine() {
    if (this.films.length > 0) {
      this.dataLineFilm = {
        labels: this.anniFilms,
        datasets: [
          {
            label: 'Film per Anno',
            data: this.filmsAnni,
            fill: false,
            borderColor: '#36A2EB',
            backgroundColor: '#36A2EB'
          }
        ]
      };
    }
  }

  loadChartFormatiSerieTVBar() {
    if (this.serieTV.length > 0) {
      this.dataBarSerieTV = {
        labels: ['Formati Serie TV'],
        datasets: [
          {
            label: this.formatiSerieTV[0],
            backgroundColor: '#006000',
            borderColor: '#006000',
            data: [this.serieTVFormati[0], 0]
          },
          {
            label: this.formatiSerieTV[1],
            backgroundColor: '#E10000',
            borderColor: '#E10000',
            data: [this.serieTVFormati[1], 0]
          }
        ]
      };
    }
  }

}
