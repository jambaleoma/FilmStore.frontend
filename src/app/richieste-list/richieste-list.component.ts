import { CustomerService } from '../_api/services/customer.service';
import { Richiesta } from '../_api/models/richiesta';
import { RichiestaService } from '../_api/services/richiesta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../_api/models';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-richieste-list',
  templateUrl: './richieste-list.component.html',
  styleUrls: ['./richieste-list.component.scss']
})
export class RichiesteListComponent implements OnInit {

  listaRichiedenti: string[];

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
    private customerService: CustomerService
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

  subsrcibeToListOfRichieste() {
    this.richiestaService.getRichieste().subscribe(notification => {
      this.richieste = notification;
      this.showRichieste = true;
    }, error => {
      this.showRichieste = true;
    }
    );
  }

  onRowSelect(event) {
    this.newRichiesta = false;
    this.richiesta = this.cloneRichiesta(event.data);
    this.customerService.getCustomerByName(this.richiesta.nomeCliente).subscribe( response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
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
    this.richiesta = { id: null };
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe( response => {
      this.customerOfRichiesta = response;
    });
    this.displayDialog = true;
  }

  save() {
    if (this.newRichiesta) {
      this.richiesta.nomeCliente = sessionStorage.getItem('customerfirstName');
      this.richiesta.dataInserimento = this.pipe.transform(new Date(), 'fullDate');
      this.richiestaService.addRichiesta(this.richiesta).subscribe(response => {
        if (response !== null) {
          this.richieste = response as Richiesta[];
          this.richiesta = null;
          this.displayDialog = false;
          this.rt.reset();
          this.customerOfRichiesta.numeroRichieste++;
          this.customerService.updateCustomer(this.customerOfRichiesta).subscribe();
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
          }
        });
      } else {
        alert('Puoi modificare solo le tue richieste');
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
        }
      });
    } else {
      alert('Puoi eliminare solo le tue richieste');
    }
  }

  close() {
    this.displayDialog = false;
  }

}
