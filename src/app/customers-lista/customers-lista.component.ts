import { RichiestaService } from '../_api/services/richiesta.service';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models';

@Component({
  selector: 'app-customers-lista',
  templateUrl: './customers-lista.component.html',
  styleUrls: ['./customers-lista.component.scss']
})
export class CustomersListaComponent implements OnInit {

  customers: Customer[] = [];

  richiestePerNomeUtente: Richiesta[];

  cols: any[];

  constructor(
    private customerService: CustomerService,
    private richiestaService: RichiestaService
  ) { }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
    this.getColumns();
  }

  getColumns() {
    this.cols = [
      { field: 'firstName', header: 'Nome' },
      { field: 'lastName', header: 'Cognome' },
      { field: 'numeroRichieste', header: 'Richieste' }
    ];
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customers = notification;
      this.getRichiesteOfCustomers();
    });
  }

  getRichiesteOfCustomers() {
    if (this.customers.length > 0) {
      for (let i = 0; i < this.customers.length; i++) {
        this.richiestaService.getRichiesteByCustomerName(this.customers[i].firstName).subscribe(notification => {
          this.richiestePerNomeUtente = notification;
          this.customers[i].numeroRichieste = this.richiestePerNomeUtente.length;
        });
      }
    }
  }
}
