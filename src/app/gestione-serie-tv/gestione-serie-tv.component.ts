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

  serie: Serie[];

  singolaSerie: Serie = { _id: null };

  showSerie = false;

  cols: any[];

  formats: SelectItem[];

  msgs: Message[] = [];

  newSerie: boolean;

  displayDialog: boolean;

  @ViewChild('rt') rt: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private serieService: SerieService,
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
    this.getCols();
  }

  getCols() {
    this.cols = [
      {
        field: 'nome',
        header: 'Nome Serie TV',
      },
      {
        field: 'numeroStagione',
        header: 'Numero Della Stagione'
      },
      {
        field: 'formato',
        header: 'Formato'
      }
    ];
  }

  subsrcibeToListOfSerie() {
    this.serieService.getSerieTVs().subscribe(notification => {
      this.serie = notification;
      this.showSerie = true;
    }, error => {
      this.showSerie = true;
    }
    );
  }

  onRowSelect(event) {
    this.newSerie = false;
    this.singolaSerie = this.cloneSerie(event.data);
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  cloneSerie(r: Serie): Serie {
    const ric = { _id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.newSerie = true;
    this.singolaSerie = { _id: null };
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
              this.serie = response as Serie[];
              this.singolaSerie = null;
              this.displayDialog = false;
              this.rt.reset();
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
              this.serie = response as Serie[];
              this.singolaSerie = null;
              this.displayDialog = false;
              this.rt.reset();
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
        this.serieService.deleteSerie(this.serieSelezionata._id).subscribe(response => {
          if (response !== null) {
            const index = this.serie.indexOf(this.serieSelezionata);
            this.serie = this.serie.filter((val, i) => i !== index);
            this.singolaSerie = null;
            this.displayDialog = false;
            this.rt.reset();
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Serie TV Eliminata' }];
          }
        });
      },
      reject: () => { }
    });
  }

  close() {
    this.displayDialog = false;
  }

}
