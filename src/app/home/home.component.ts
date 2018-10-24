import { SerieService } from './../_api/services/serie.service';
import { FilmService } from './../_api/services/film.service';
import { ApplicationService } from './../_service/application.service';
import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Film } from '../_api/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSerieTvAdminDialog = false;
  loggedCustomer: Customer;
  newFilms: Film[] = [];
  newFilmsToPut: Film[] = [];
  newfilmNumber = 9;
  newSeries: Film[] = [];
  newSeriesToPut: Film[] = [];
  newSeriesNumber = 9;

  constructor(
    private filmSerive: FilmService,
    private serieService: SerieService,
    private router: Router,
    private customerService: CustomerService,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private renderer: Renderer2,
  ) {
    this.renderer.removeClass(document.body, 'backImage');
  }

  ngOnInit() {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
      if (this.applicationService.getShowWelcome()) {
        this.messageService.add({
          key: 'homeTost', severity: 'success',
          summary: 'Accesso Eseguito', detail: 'Bentornato ' + this.loggedCustomer.firstName
        });
        this.applicationService.setFalseShowWelcome();
      }
    });
    this.getNewFilm();
    this.getNewSerie();
  }

  getNewFilm() {
    this.filmSerive.getFilms().subscribe(notification => {
      for (let i = 0; i < this.newfilmNumber; i++) {
        const film = notification[Math.floor(Math.random() * notification.length)];
        if (!this.newFilmsToPut.find(f => f._id === film._id)) {
          this.newFilmsToPut.push(film);
        } else {
          i--;
        }
      }
      this.newFilms = this.newFilmsToPut;
    });
  }

  getNewSerie() {
    this.serieService.getSerieTVs().subscribe(notification => {
      for (let i = 0; i < this.newSeriesNumber; i++) {
        const serie = notification[Math.floor(Math.random() * notification.length)];
        if (!this.newSeriesToPut.find(s => s._id === serie._id)) {
          this.newSeriesToPut.push(serie);
        } else {
          i--;
        }
      }
      this.newSeries = this.newSeriesToPut;
    });
  }

  showDetailsFilm(filmId: string) {
    this.router.navigate(['filmStore/Film/view', filmId]);
  }

  showDetailsSerie(serieId: string) {
    this.router.navigate(['filmStore/SerieTV/view', serieId]);
  }

  goToSerieTv() {
    this.router.navigate(['filmStore/ricercaSerieTV']);
  }

  goToSerieTvOnAdminMode() {
    this.router.navigate(['filmStore/gestioneSerieTV']);
  }

  goToFilms() {
    this.router.navigate(['filmStore/ricercaFilm']);
  }

  goToFilmsOnAdminMode() {
    this.router.navigate(['filmStore/gestioneFilm']);
  }

  goToRicheiste() {
    this.router.navigate(['filmStore/richieste/view', sessionStorage.getItem('customerfirstName')]);
  }

  goToUtentiAdminMode() {
    this.router.navigate(['filmStore/utenti']);
  }

  goToRicheisteOnAdminMode() {
    this.router.navigate(['filmStore/richieste']);
  }
}
