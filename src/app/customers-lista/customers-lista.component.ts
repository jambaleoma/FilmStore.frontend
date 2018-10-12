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

  showChangePassword = false;

  checked1 = false;

  customerPassword: string;

  newCustomerPassword: string;

  repeatedNewCustomerPassword: string;

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
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.newCustomer = true;
    this.customer = { value: null };
    this.displayDialog = true;
    this.showChangePassword = true;
    setTimeout(() => {
      this.renderer.selectRootElement('#nome').focus();
    }, 100);
  }

  goToListaRichiesteCustomer(nomeCustomer: string) {
    this.router.navigate(['filmStore/richieste/view', nomeCustomer]);
  }

  manageUser(customer: Customer) {
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.showChangePassword = false;
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

  save(pwsChange?: boolean) {
    if (this.newCustomer) {
      if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
        this.confirmationService.confirm({
          message: 'Sicuro di voler Inserire questo Utente?',
          header: 'Inserimento Utente',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.customer.label = this.customer.firstName;
            this.customer.value = this.customer.firstName;
            this.customer.password = this.newCustomerPassword;
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
        this.msgs = [{ severity: 'warn', summary: 'Errore Password', detail: 'Attenzione le Password non corrispondono' }];
      }
    } else {
      if (pwsChange) {
        if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
          if (this.customerPassword === this.customer.password) {
            this.confirmationService.confirm({
              message: 'Sicuro di voler Cambiare la Password?',
              header: 'Aggiornamento Password',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.customer.password = this.newCustomerPassword;
                this.customerService.updateCustomer(this.customer).subscribe(response => {
                  if (response !== null) {
                    this.customers = response as Customer[];
                    this.customer = null;
                    this.displayDialog = false;
                    this.ct.reset();
                    this.msgs = [{ severity: 'success', summary: 'Aggiornamento Password Completato', detail: 'Password Modificata' }];
                  }
                });
              },
              reject: () => { }
            });
          } else {
            this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'La Password Attuale non è Corretta' }];
          }
        } else {
          this.msgs = [{ severity: 'warn', summary: 'Attenzione', detail: 'Le Password non Corrispondono' }];
        }
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
    if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
      if (this.customerPassword === this.customer.password) {
        this.confirmationService.confirm({
          message: 'Sicuro di voler Cambiare la Password di ' + customer.firstName + ' ?',
          header: 'Aggiornamento Password Utente',
          accept: () => {
            customer.password = this.newCustomerPassword;
            this.customerService.updateCustomer(customer).subscribe(response => {
              if (response !== null) {
                const index = this.customers.indexOf(this.customerSelezionato);
                this.customers = this.customers.filter((val, i) => i !== index);
                this.customer = null;
                this.displayDialog = false;
                this.ct.reset();
                this.msgs = [{ severity: 'success', summary: 'Aggiornamento Completato', detail: 'Password Aggiornata' }];
              }
            });
          },
          reject: () => { }
        });
      } else {
        this.msgs = [{ severity: 'error', summary: 'Errore Password', detail: 'La Password non è Corretta' }];
      }
    } else {
      this.msgs = [{ severity: 'warn', summary: 'Errore Password', detail: 'Attenzione le Password non corrispondono' }];
    }
  }

  annul() {
    this.customerPassword = undefined;
    this.newCustomerPassword = undefined;
    this.repeatedNewCustomerPassword = undefined;
    this.showChangePassword = false;
  }

}
