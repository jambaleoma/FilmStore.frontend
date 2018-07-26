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

  richieste2Customer: Richiesta[];

  showCustomers = false;

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
      { field: 'lastName', header: 'Cognome' }
    ];
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customers = notification;
      for (let i = 0; i < this.customers.length; i++) {
        // this.customers[i].richieste.push(this.subsrcibeToListOfRichiesteByCustomerName(this.customers[i].firstName));
      }
      this.showCustomers = true;
    });
  }

  subsrcibeToListOfRichiesteByCustomerName(name: string) {
    this.richiestaService.getRichiesteByCustomerName(name).subscribe(notification => {
      this.richieste2Customer = notification;
    });
    return this.richieste2Customer;
  }

}
