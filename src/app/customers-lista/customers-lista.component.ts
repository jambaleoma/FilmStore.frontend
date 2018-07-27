import { RichiestaService } from '../_api/services/richiesta.service';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models';

@Component({
  selector: 'app-customers-lista',
  templateUrl: './customers-lista.component.html',
  styleUrls: ['./customers-lista.component.scss']
})
export class CustomersListaComponent implements OnInit {

  customers: Customer[];

  cols: any[];

  richiesteSub: Richiesta[];

  // TODO: create a MAP <string, Richiesta[]> Richieste2Customer

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
    if (this.customers) {
      for (let i = 0; i < this.customers.length; i++) {
        const richieste2Customer: Richiesta[] = this.subsrcibeToListOfRichiesteByCustomerName(this.customers[i].firstName);
      if (richieste2Customer) {   // QUI NON CI ENTRA MAI!!!!!!!
          this.customers[i].richieste.push(richieste2Customer[i]);
          this.customers[i].numeroRichieste = this.customers[i].richieste.length;
        }
      }
      console.log(this.customers);
    }
  }

  subsrcibeToListOfRichiesteByCustomerName(name: string) {
    this.richiestaService.getRichiesteByCustomerName(name).subscribe(notification => {
      this.richiesteSub = notification;
      console.log(this.richiesteSub);
    });
    if (this.richiesteSub) {
      return this.richiesteSub;
    }
  }

  buttonConsoleLog() {
    console.log(this.customers);
  }

}
