import { StagioneService } from './../_api/services/stagione.service';
import { FilmService } from './../_api/services/film.service';
import { ApplicationService } from './../_service/application.service';
import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Film, Serie } from '../_api/models';
import { MessageService } from 'primeng/api';
import { SerieService } from '../_api/services/serie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSerieTvAdminDialog = false;
  loggedCustomer: Customer;
  recommendedFilms: Film[];
  recommendedFilmsToPut: Film[] = [];
  recommendedfilmNumber = 3;
  newFilms: Film[] = [];
  newfilmsNumber = '9';
  newSerie: Serie[] = [];
  newSerieNumber = '9';
  loadFooter = false;
  categoriaPreferita: string;

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
      if (this.loggedCustomer.categoriePreferite && this.loggedCustomer.categoriePreferite.length > 0) {
        this.getRecommendedFilm();
      }
      if (this.applicationService.getShowWelcome()) {
        this.messageService.add({
          key: 'homeTost',
          severity: 'success',
          summary: 'Accesso Eseguito',
          detail: this.loggedCustomer.sesso === 'Maschio' ? 'Bentornato ' : 'Bentornata ' + this.loggedCustomer.firstName
        });
        this.applicationService.setFalseShowWelcome();
      }
    });
    this.getNewFilm();
    this.getNewSerie();
  }

  getNewFilm() {
    this.filmSerive.getNewFilms(this.newfilmsNumber).subscribe(notification => {
      this.newFilms = notification;
    });
  }

  getNewSerie() {
    this.serieService.getNewSerie(this.newSerieNumber).subscribe(notification => {
      this.newSerie = notification;
      this.loadFooter = true;
    });
  }

  getRecommendedFilm() {
    if (this.loggedCustomer) {
      const index = Math.floor(Math.random() * this.loggedCustomer.categoriePreferite.length);
      this.categoriaPreferita = this.loggedCustomer.categoriePreferite[index];
      this.filmSerive.getFilmsByCategory(this.categoriaPreferita).subscribe(notification => {
        if (notification) {
          const films = notification;
          for (let i = 0; i < this.recommendedfilmNumber; i++) {
            if (films[i] && this.recommendedFilmsToPut) {
              if (!this.recommendedFilmsToPut.find(f => f._id === (films[i]._id || films[i].id))) {
                this.recommendedFilmsToPut.push(films[i]);
              } else {
                i--;
              }
            }
          }
        } else {
          this.getRecommendedFilm();
        }
        this.recommendedFilms = this.recommendedFilmsToPut;
      });
    }
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

  goToPersonalPrifile() {
    this.router.navigate(['filmStore/profiloUtente']);
  }
}
