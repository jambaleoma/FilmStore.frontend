import { Customer } from './../_api/models/customer';
import { CustomerService } from '../_api/services/customer.service';
import { Richiesta } from '../_api/models/richiesta';
import { RichiestaService } from '../_api/services/richiesta.service';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { ListItem } from '../_api/models';

@Component({
  selector: 'app-richieste-list',
  templateUrl: './richieste-list.component.html',
  styleUrls: ['./richieste-list.component.scss']
})
export class RichiesteListComponent implements OnInit {

  listaRichiedenti: SelectItem[] = [];

  pipe: DatePipe = new DatePipe('it');

  richiestaSelezionata: Richiesta;

  richieste: Richiesta[];

  richiesta: Richiesta = { id: null };

  showRichieste = false;

  cols: any[];

  formats: SelectItem[];

  newRichiesta: boolean;

  displayDialog: boolean;

  customerOfRichiesta: Customer;

  @ViewChild('rt') rt: Table;

  constructor(
    private richiestaService: RichiestaService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private renderer: Renderer2
  ) {

    this.formats = [
      { label: '', value: '' },
      { label: 'FULL-HD', value: 'FULL-HD' },
      { label: 'HD', value: 'HD' },
      { label: 'DVD', value: 'DVD' },
    ];
  }

  ngOnInit() {
    this.subsrcibeToListOfRichieste();
    this.subsrcibeToListOfCustomer();
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
      }
    ];
  }

  subsrcibeToListOfCustomer() {
    this.customerService.getCustomers().subscribe(notification => {
      if (notification) {
        this.listaRichiedenti = [
          {
            label: notification[0].firstName.toString(),
            value: notification[0].firstName.toString()
          },
          {
            label: notification[1].firstName.toString(),
            value: notification[1].firstName.toString()
          },
          {
            label: notification[2].firstName.toString(),
            value: notification[2].firstName.toString()
          },
          {
            label: notification[3].firstName.toString(),
            value: notification[3].firstName.toString()
          },
        ];
      }
    });
  }

  subsrcibeToListOfRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      this.showRichieste = true;
    }, error => {
      this.showRichieste = true;
    }
    );
  }

  notAdmin() {
    if (sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
      return false;
    } else {
      return true;
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
      nomeCliente: sessionStorage.getItem('customerfirstName')};
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
      this.richiesta.nomeCliente = this.customerOfRichiesta.firstName;
      this.richiestaService.addRichiesta(this.richiesta).subscribe(response => {
        if (response !== null) {
          this.richieste = response as Richiesta[];
          this.richiesta = null;
          this.displayDialog = false;
          this.rt.reset();
          this.customerOfRichiesta.numeroRichieste++;
          this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
          this.messageService.add({key: 'OK', summary: 'Inserimento Eseguito', detail: 'Inserimento Eseguito con Successo'});
        }
      });
    } else {
      if (this.richiesta.nomeCliente === sessionStorage.getItem('customerfirstName') ||
        sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
        this.richiestaService.updateRichiesta(this.richiesta).subscribe(response => {
          if (response !== null) {
            this.richieste = response as Richiesta[];
            this.richiesta = null;
            this.displayDialog = false;
            this.rt.reset();
            this.messageService.add({key: 'OK', summary: 'Aggiornamento Eseguito', detail: 'Aggiornamento Eseguito con Successo'});
          }
        });
      } else {
        this.messageService.add({key: 'KO', summary: 'Aggiornamento Negato', detail: 'Puoi Modificare solo le tue richieste'});
      }
    }
  }

  delete() {
    if (this.richiesta.nomeCliente === sessionStorage.getItem('customerfirstName') ||
      sessionStorage.getItem('customerfirstName') === 'Vincenzo') {
      this.richiestaService.deleteRichiesta(this.richiestaSelezionata.id).subscribe(response => {
        if (response !== null) {
          const index = this.richieste.indexOf(this.richiestaSelezionata);
          this.richieste = this.richieste.filter((val, i) => i !== index);
          this.richiesta = null;
          this.displayDialog = false;
          this.rt.reset();
          this.customerOfRichiesta.numeroRichieste--;
          this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
          this.messageService.add({key: 'OK', summary: 'Eliminazione Eseguita', detail: 'Eliminazione Eseguita con Successo'});
        }
      });
    } else {
      this.messageService.add({key: 'KO', summary: 'Eliminazione Negata', detail: 'Puoi Eliminare solo le tue richieste' });
    }
  }

  close() {
    this.displayDialog = false;
  }

}
