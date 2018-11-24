import { ListItem } from './../_api/models/list-items';
import { Router } from '@angular/router';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models';
import { Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  customerSelezionato: Customer;

  newCustomer: boolean;

  showYDSTMW = false;

  msgs: Message[] = [];

  richiestePerNomeUtente: Richiesta[];

  cols: any[];

  displayDialog: boolean;

  showChangePassword = false;

  checked1 = false;

  customerPassword: string;

  newCustomerPassword: string;

  repeatedNewCustomerPassword: string;

  loggedCustomer: Customer;

  sessi: ListItem[];

  @ViewChild('ct') ct: Table;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
      this.loggedCustomer = notification;
      this.customers.push(this.loggedCustomer);
    });
   }

  ngOnInit() {
    this.getColumns();
  }

  getColumns() {

    this.sessi = [
      { _id: '0', label: '', value: '' },
      { _id: 'M', label: 'Maschio', value: 'Maschio' },
      { _id: 'F', label: 'Femmina', value: 'Femmina' }
    ];

    this.cols = [
      { field: 'firstName', header: 'Nome' },
      { field: 'lastName', header: 'Cognome' },
      { field: 'sesso', header: 'Sesso' },
      { field: 'dataDiNascita', header: 'Data di Nascita' },
      { field: 'numeroRichieste', header: 'Richieste' }
    ];
  }

  goToListaRichiesteCustomer(nomeCustomer: string) {
    this.router.navigate(['filmStore/richieste/view', nomeCustomer]);
  }

}
