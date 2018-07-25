import { CustomerService } from './../_api/services/customer.service';
import { Richiesta } from './../_api/models/richiesta';
import { RichiestaService } from './../_api/services/richiesta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../_api/models';
import { SelectItem } from 'primeng/api';
import { timestamp } from '../../../node_modules/rxjs/operator/timestamp';
import { DatePipe } from '../../../node_modules/@angular/common';
import { Table } from '../../../node_modules/primeng/table';

@Component({
  selector: 'app-richieste-list',
  templateUrl: './richieste-list.component.html',
  styleUrls: ['./richieste-list.component.scss']
})
export class RichiesteListComponent implements OnInit {

  richiedente: Customer;

  listaRichiedenti: string[];

  pipe = new DatePipe('it-VA');

  richiestaSelezionata: Richiesta;

  richieste: Richiesta[];

  richiesta: Richiesta = { id: null };

  showRichieste = false;

  cols: any[];

  formats: SelectItem[];

  newRichiesta: boolean;

  displayDialog: boolean;

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
      console.log(error);
      this.showRichieste = true;
    }
    );
  }

  onRowSelect(event) {
    this.newRichiesta = false;
    this.richiesta = this.cloneRichiesta(event.data);
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
    this.displayDialog = true;
  }

  save() {
    const richieste = [...this.richieste];
    if (this.newRichiesta) {
      this.richiesta.nomeCliente = 'Vincenzo';
      this.richiesta.dataInserimento = '24072018000000';
      this.richiestaService.addRichiesta(this.richiesta).subscribe(response => {
        if (response !== null) {
        richieste.push(this.richiesta);
        this.richieste = richieste;
        this.richiesta = null;
        this.displayDialog = false;
        this.rt.reset();
        }
      });
    } else {
      richieste[this.richieste.indexOf(this.richiestaSelezionata)] = this.richiesta;
      this.richiestaService.updateRichiesta(this.richiesta).subscribe(response => {
        if (response !== null) {
        this.richiesta = null;
        this.displayDialog = false;
        this.rt.reset();
        }
      });
    }
  }

  delete() {
    this.richiestaService.deleteRichiesta(this.richiestaSelezionata.id).subscribe(response => {
      const index = this.richieste.indexOf(this.richiestaSelezionata);
      this.richieste = this.richieste.filter((val, i) => i !== index);
      this.richiesta = null;
      this.displayDialog = false;
      this.rt.reset();
    });
  }

  getListaRichiedentiRichieste(idRichiedente: string) {
    if (idRichiedente) {
      this.customerService.getCustomerById(idRichiedente).subscribe(notification => {
        this.richiedente = notification;
        console.log(this.richiedente.firstName);
      });
    }
    return this.richiedente.firstName;
  }

}
