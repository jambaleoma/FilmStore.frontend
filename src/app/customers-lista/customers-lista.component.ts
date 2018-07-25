import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../_api/models/customer';

@Component({
  selector: 'app-customers-lista',
  templateUrl: './customers-lista.component.html',
  styleUrls: ['./customers-lista.component.scss']
})
export class CustomersListaComponent implements OnInit {

  customers: Customer[];

  cols: any[];

  showCustomers = false;

  constructor(
    private customerService: CustomerService
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
      this.showCustomers = true;
    }
    );
  }

}
