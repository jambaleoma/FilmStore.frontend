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

  customers: Customer[] = [];

  richiestePerNomeUtente: Richiesta[];

  cols: any[];

  adminMode = false;

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
      { field: 'lastName', header: 'Cognome' },
      { field: 'numeroRichieste', header: 'Richieste' }
    ];
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      if (sessionStorage.getItem('customerfirstName') !== 'Vincenzo') {
        this.customers[0] = notification.find(customer => customer.firstName === sessionStorage.getItem('customerfirstName'));
        this.adminMode = false;
      } else {
        this.customers = notification;
        this.adminMode = true;
      }
    });
  }

}
