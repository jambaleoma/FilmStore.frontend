import { ListItem } from './../_api/models/list-items';
import { ApplicationService } from './../_service/application.service';
import { StagioneService } from './../_api/services/stagione.service';
import { Stagione } from './../_api/models/stagione';
import { SerieService } from './../_api/services/serie.service';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Serie } from '../_api/models';
import { SelectItem, Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-gestione-serie-tv',
  templateUrl: './gestione-serie-tv.component.html',
  styleUrls: ['./gestione-serie-tv.component.scss']
})
export class GestioneSerieTvComponent implements OnInit {

  serieSelezionata: Serie;

  series: Serie[] = [];

  stagioni: Stagione[] = [];

  stagioneSelezionata: Stagione;

  singolaSerie: Serie = { serie_id: null };

  singolaStagione: Stagione = { stagione_id: null };

  showSerie = false;

  filters: any = {};

  serieCols: any[];

  stagioneCols: any[];

  formats: SelectItem[];

  anniStagione: any[] = [];

  nStagione: number;

  nStagioni: SelectItem[];

  msgs: Message[] = [];

  newSerie = false;

  newStagione = false;

  displayDialogSerie: boolean;

  displayDialogStagione: boolean;

  audios: ListItem[] = [];

  @ViewChild('rt') rt: Table;

  constructor(
    private applicationService: ApplicationService,
    private confirmationService: ConfirmationService,
    private serieService: SerieService,
    private stagioneService: StagioneService,
    private renderer: Renderer2
  ) {

    this.formats = [
      { label: '', value: '' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'WEB', value: 'WEB' }
    ];
  }

  ngOnInit() {
    this.subscribeToListOfCountry();
    this.subsrcibeToListOfSerie();
    this.getSerieCols();
    this.getStagioneCols();
  }

  subscribeToListOfCountry() {
    this.applicationService.countriesObservable.subscribe(notification => {
      this.audios = notification;
    });
  }

  getSerieCols() {
    this.serieCols = [
      { field: 'nome', header: 'Nome Serie TV' }
    ];
  }

  getStagioneCols() {
    this.stagioneCols = [
      { field: 'numeroStagione', header: 'N° Stagione' },
      { field: 'numeroEpisodi', header: 'N° Episodi' },
      { field: 'formato', header: 'Formato' },
      { field: 'linguaAudio', header: 'Audio' },
      { field: 'linguaSottotitoli', header: 'Sottotitoli' },
      { field: 'anno', header: 'Anno' }
    ];
  }

  subsrcibeToListOfSerie() {
    this.serieService.getSerieTVs().subscribe(seriesNotification => {
      if (seriesNotification) {
        this.series = seriesNotification;
      }
    });
  }

  onRowSerieSelect(event) {
    this.stagioni = undefined;
    this.newSerie = false;
    this.singolaSerie = this.cloneSerie(event.data);
    this.stagioneService.getStagioniByIdSerie(this.singolaSerie.serie_id).subscribe(notification => {
      this.stagioni = notification;
    });
    this.displayDialogSerie = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  onRowStagioneSelect(event) {
    this.newStagione = false;
    this.singolaStagione = this.cloneStagione(event.data);
    this.displayDialogStagione = true;
    // setTimeout(() => {
    //   this.renderer.selectRootElement('#anno').focus();
    // }, 100);
  }

  cloneSerie(s: Serie): Serie {
    const ser = { serie_id: null };
    // tslint:disable-next-line:forin
    for (const prop in s) {
      ser[prop] = s[prop];
    }
    return ser;
  }

  cloneStagione(s: Stagione): Stagione {
    const sta = { stagione_id: null };
    // tslint:disable-next-line:forin
    for (const prop in s) {
      sta[prop] = s[prop];
    }
    return sta;
  }

  addSerie() {
    this.newSerie = true;
    this.singolaSerie = { serie_id: null };
    this.displayDialogSerie = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  addStagione() {
    this.newStagione = true;
    this.singolaStagione = { stagione_id: null };
    this.displayDialogStagione = true;
    // setTimeout(() => {
    //   this.renderer.selectRootElement('#anno').focus();
    // }, 100);
  }

  saveSerie() {
    if (this.newSerie) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questa Serie TV?',
        header: 'Inserimento Serie TV',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.serieService.addSerie(this.singolaSerie).subscribe(response => {
            if (response !== null) {
              this.series = response as Serie[];
              this.singolaSerie = null;
              this.displayDialogSerie = false;
              this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Serie TV Inserita' }];
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questa Serie TV?',
        header: 'Aggiornamento Serie TV',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.serieService.updateSerie(this.singolaSerie).subscribe(response => {
            if (response !== null) {
              this.series = response as Serie[];
              this.singolaSerie = null;
              this.displayDialogSerie = false;
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Serie TV Aggiornata' }];
            }
          });
        },
        reject: () => { }
      });
    }
  }

  saveStagione() {
    if (this.newStagione) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questa Stagione?',
        header: 'Inserimento Stagione',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.singolaStagione.serie_id = this.singolaSerie.serie_id;
          this.stagioneService.addStagione(this.singolaStagione).subscribe(responseStagione => {
            if (responseStagione !== null) {
              this.stagioni = responseStagione as Stagione[];
              this.singolaStagione = null;
              this.serieService.updateSerie(this.singolaSerie).subscribe(responseSerie => {
                if (responseSerie !== null) {
                  this.series = responseSerie as Serie[];
                }
              });
              this.displayDialogStagione = false;
              this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Stagione Inserita' }];
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questa Stagione?',
        header: 'Aggiornamento Stagione',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.stagioneService.updateStagione(this.singolaStagione).subscribe(response => {
            if (response !== null) {
              this.stagioni = response as Stagione[];
              this.singolaStagione = null;
              this.serieService.updateSerie(this.singolaSerie).subscribe(responseSerie => {
                if (responseSerie !== null) {
                  this.series = responseSerie as Serie[];
                }
              });
              this.displayDialogStagione = false;
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Stagione Aggiornata' }];
            }
          });
        },
        reject: () => { }
      });
    }
  }


  deleteSerie() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questa Serie TV e tutte le Stagioni in essa contenute?',
      header: 'Eliminazione Serie TV',
      icon: 'fa fa-trash',
      accept: () => {
        this.stagioneService.deleteStagioniBySerieId(this.serieSelezionata.serie_id).subscribe(responseStagione => {
          if (responseStagione !== null) {
            this.serieService.deleteSerie(this.serieSelezionata.serie_id).subscribe(response => {
              if (response !== null) {
                const index = this.series.indexOf(this.serieSelezionata);
                this.series = this.series.filter((val, i) => i !== index);
                this.singolaSerie = null;
                this.displayDialogSerie = false;
                this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Serie TV Eliminata' }];
              }
            });
          }
        });
      },
      reject: () => { }
    });
  }

  deleteStagione() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questa Stagione?',
      header: 'Eliminazione Stagione TV',
      icon: 'fa fa-trash',
      accept: () => {
        this.stagioneService.deleteStagione(this.stagioneSelezionata.stagione_id).subscribe(response => {
          if (response !== null) {
            const index = this.stagioni.indexOf(this.stagioneSelezionata);
            this.stagioni = this.stagioni.filter((val, i) => i !== index);
            this.singolaStagione = null;
            this.serieService.updateSerie(this.singolaSerie).subscribe(responseSerie => {
              if (responseSerie !== null) {
                this.series = responseSerie as Serie[];
              }
            });
            this.displayDialogStagione = false;
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Stagione Eliminata' }];
          }
        });
      },
      reject: () => { }
    });
  }

  //  *** Reset Valori selzionati nei Filtri ***
  reset(stvt: Table) {
    stvt.reset();
    this.filters = {};
  }

}
