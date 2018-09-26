import { Router } from '@angular/router';
import { Customer } from './../_api/models/customer';
import { CustomerService } from '../_api/services/customer.service';
import { Richiesta } from '../_api/models/richiesta';
import { RichiestaService } from '../_api/services/richiesta.service';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { SelectItem, ConfirmationService, Message } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-richieste-utente',
  templateUrl: './richieste-utente.component.html',
  styleUrls: ['./richieste-utente.component.scss']
})
export class RichiesteUtenteComponent implements OnInit {

  nomeCustomer: string;

  urlRichiesteCustomer: string;

  arrayStringUrl: string[];

  pipe: DatePipe = new DatePipe('it');

  richiestaSelezionata: Richiesta;

  richieste: Richiesta[];

  richiesta: Richiesta = { id: null };

  showRichieste = false;

  cols: any[];

  formats: SelectItem[];

  statiRichiesta: SelectItem[];

  msgs: Message[] = [];

  newRichiesta: boolean;

  displayDialog: boolean;

  customerOfRichiesta: Customer;

  @ViewChild('rt') rt: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private richiestaService: RichiestaService,
    private customerService: CustomerService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.urlRichiesteCustomer = this.router.url.substring(0, this.router.url.length);
    this.arrayStringUrl = this.urlRichiesteCustomer.split('/');
    this.nomeCustomer = this.arrayStringUrl[this.arrayStringUrl.length - 1];

    this.statiRichiesta = [
      { label: '', value: '' },
      { label: 'IN LAVORAZIONE', value: 'IN LAVORAZIONE' },
      { label: 'PRESA IN CARICO', value: 'PRESA IN CARICO' },
      { label: 'ACCETTATA', value: 'ACCETTATA' },
      { label: 'RIFIUTATA', value: 'RIFIUTATA' }
    ];

    this.formats = [
      { label: '', value: '' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' },
    ];
  }

  ngOnInit() {
    this.subsrcibeToListOfRichieste();
    this.getCols();
  }

  getCols() {
    this.cols = [
      {
        field: 'nomeCliente',
        header: 'Richiedente',
      },
      {
        field: 'titoloFilmRichiesto',
        header: 'Titolo'
      },
      {
        field: 'formatoFilmRichiesto',
        header: 'Formato'
      },
      {
        field: 'dataInserimento',
        header: 'Data'
      },
      {
        field: 'stato',
        header: 'Stato Richiesta'
      }
    ];
  }

  subsrcibeToListOfRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      this.richieste = this.richieste.filter((val, i) => val.nomeCliente === this.nomeCustomer);
      this.showRichieste = true;
    }, error => {
      this.showRichieste = true;
    }
    );
  }

  adminMode() {
    if (sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
      return true;
    } else {
      return false;
    }
  }

  onRowSelect(event) {
    this.newRichiesta = false;
    this.richiesta = this.cloneRichiesta(event.data);
    this.customerService.getCustomerByName(this.richiesta.nomeCliente).subscribe(response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  cloneRichiesta(r: Richiesta): Richiesta {
    const ric = { id: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  showDialogToAdd() {
    this.newRichiesta = true;
    this.richiesta = {
      id: null,
      dataInserimento: this.pipe.transform(new Date(), 'fullDate'),
      nomeCliente: sessionStorage.getItem('customerfirstName')
    };
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#titolo').focus();
    }, 100);
  }

  changeCustomer(event) {
    this.customerService.getCustomerByName(event.value).subscribe(response => {
      this.customerOfRichiesta = response;
    });
  }

  save() {
    if (this.newRichiesta) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questa Richiesta?',
        header: 'Inserimento Richiesta',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.richiesta.nomeCliente = this.customerOfRichiesta.firstName;
          this.richiesta.stato = 'IN LAVORAZIONE';
          this.richiestaService.addRichiesta(this.richiesta).subscribe(response => {
            if (response !== null) {
              this.richieste = response as Richiesta[];
              this.richiesta = null;
              this.displayDialog = false;
              this.rt.reset();
              this.customerOfRichiesta.numeroRichieste++;
              this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
              this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Richiesta Inserita' }];
              this.subsrcibeToListOfRichieste();
            }
          });
        },
        reject: () => { }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questa Richiesta?',
        header: 'Aggiornamento Richiesta',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.richiesta.stato = 'IN LAVORAZIONE';
          this.richiestaService.updateRichiesta(this.richiesta).subscribe(response => {
            if (response !== null) {
              this.richieste = response as Richiesta[];
              this.richiesta = null;
              this.displayDialog = false;
              this.rt.reset();
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Richiesta Aggiornata' }];
              this.subsrcibeToListOfRichieste();
            }
          });
        },
        reject: () => { }
      });
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questa Richiesta?',
      header: 'Eliminazione Richiesta',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.richiestaService.deleteRichiesta(this.richiestaSelezionata.id).subscribe(response => {
          if (response !== null) {
            const index = this.richieste.indexOf(this.richiestaSelezionata);
            this.richieste = this.richieste.filter((val, i) => i !== index);
            this.richiesta = null;
            this.displayDialog = false;
            this.rt.reset();
            this.customerOfRichiesta.numeroRichieste--;
            this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Richiesta Eliminata' }];
          }
        });
      }, reject: () => { }
    });
  }

  close() {
    this.displayDialog = false;
  }

}
