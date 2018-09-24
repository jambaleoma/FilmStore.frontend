import { Router } from '@angular/router';
import { CustomerService } from '../_api/services/customer.service';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Customer } from '../_api/models/customer';
import { Richiesta } from '../_api/models';
import { Message, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-customers-lista',
  templateUrl: './customers-lista.component.html',
  styleUrls: ['./customers-lista.component.scss']
})
export class CustomersListaComponent implements OnInit {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  customerSelezionato: Customer;

  newCustomer: boolean;

  msgs: Message[] = [];

  richiestePerNomeUtente: Richiesta[];

  cols: any[];

  displayDialog: boolean;

  adminMode = false;

  @ViewChild('ct') ct: Table;

  constructor(
    private confirmationService: ConfirmationService,
    private customerService: CustomerService,
    private router: Router,
    private renderer: Renderer2
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

  showDialogToAdd() {
    this.newCustomer = true;
    this.customer = { value: null };
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#nome').focus();
    }, 100);
  }

  goToListaRichiesteCustomer(nomeCustomer: string) {
    this.router.navigate(['filmStore/richieste/view', nomeCustomer]);
  }

  manageUser(customer: Customer) {
    this.newCustomer = false;
    this.customer = this.cloneCustomer(customer);
    this.customerSelezionato = customer;
    this.displayDialog = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#nome').focus();
    }, 100);
  }

  cloneCustomer(r: Customer): Customer {
    const ric = { value: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  save() {
    if (this.newCustomer) {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Inserire questo Utente?',
        header: 'Inserimento Utente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.customer.label = this.customer.firstName;
          this.customer.value = this.customer.firstName;
          this.customer.password = 'passworDi' + this.customer.firstName;
          this.customerService.addCustomer(this.customer).subscribe(response => {
            if (response !== null) {
              this.customers = response as Customer[];
              this.customer = null;
              this.displayDialog = false;
              this.ct.reset();
              this.msgs = [{ severity: 'success', summary: 'Inserimento Completato', detail: 'Utente Inserito' }];
            }
          });
        },
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Sicuro di voler Aggiornare questo Utente?',
        header: 'Aggiornamento Utente',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.customer.label = this.customer.firstName;
          this.customer.value = this.customer.firstName;
          this.customerService.updateCustomer(this.customer).subscribe(response => {
            if (response !== null) {
              this.customers = response as Customer[];
              this.customer = null;
              this.displayDialog = false;
              this.ct.reset();
              this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Utente Aggiornato' }];
            }
          });
        },
        reject: () => { }
      });
    }
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare questo Utente?',
      header: 'Eliminazione Utente',
      icon: 'fa fa-trash',
      accept: () => {
        this.customerService.deleteCustomer(this.customerSelezionato.id).subscribe(response => {
          if (response !== null) {
            const index = this.customers.indexOf(this.customerSelezionato);
            this.customers = this.customers.filter((val, i) => i !== index);
            this.customerSelezionato = null;
            this.customer = null;
            this.displayDialog = false;
            this.ct.reset();
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Completata', detail: 'Utente Eliminato' }];
          }
        });
      },
      reject: () => { }
    });
  }

  resetPassword(customer: Customer) {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Resettare la Password di ' + customer.firstName + ' ?',
      header: 'Reset Password Utente',
      accept: () => {
        customer.password = 'password';
        this.customerService.updateCustomer(customer).subscribe(response => {
          if (response !== null) {
            const index = this.customers.indexOf(this.customerSelezionato);
            this.customers = this.customers.filter((val, i) => i !== index);
            this.customer = null;
            this.displayDialog = false;
            this.ct.reset();
            this.msgs = [{ severity: 'success', summary: 'Reset Completato', detail: 'Password Resettata' }];
          }
        });
      },
      reject: () => { }
    });
  }

}
