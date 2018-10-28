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

  nStagione: number;

  nStagioni: SelectItem[];

  msgs: Message[] = [];

  newSerie: boolean;

  displayDialog: boolean;

  showStagioneDetails = false;

  @ViewChild('rt') rt: Table;

  constructor(
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
    this.subsrcibeToListOfSerie();
    this.getSerieCols();
    this.getStagioneCols();
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
    this.showStagioneDetails = false;
    this.newSerie = false;
    this.singolaSerie = this.cloneSerie(event.data);
    this.stagioni = this.singolaSerie.stagioni;
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  onRowStagioneSelect(event) {
    this.showStagioneDetails = false;
    this.newSerie = false;
  }

  cloneSerie(r: Serie): Serie {
    const ric = { serie_id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.showStagioneDetails = false;
    this.newSerie = true;
    this.singolaSerie = { serie_id: null };
    this.singolaStagione = { stagione_id: null };
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  save() {
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
              this.displayDialog = false;
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
              this.displayDialog = false;
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Serie TV Aggiornata' }];
            }
          });
        },
        reject: () => { }
      });
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questa Serie TV?',
      header: 'Eliminazione Serie TV',
      icon: 'fa fa-trash',
      accept: () => {
        this.serieService.deleteSerie(this.serieSelezionata.serie_id).subscribe(response => {
          if (response !== null) {
            const index = this.series.indexOf(this.serieSelezionata);
            this.series = this.series.filter((val, i) => i !== index);
            this.singolaSerie = null;
            this.displayDialog = false;
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Serie TV Eliminata' }];
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

  addStagione(serie_id: string) {
    this.singolaStagione.serie_id = serie_id;
    this.showStagioneDetails = true;
  }

}
