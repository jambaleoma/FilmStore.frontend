import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../_api/models';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-customer-setting',
  templateUrl: './customer-setting.component.html',
  styleUrls: ['./customer-setting.component.scss']
})
export class CustomerSettingComponent {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  loggedCustomer: Customer;

  msgs: Message[] = [];

  showCustomerDetails = false;

  showChangePassword = false;

  customerPassword: string;

  newCustomerPassword: string;

  repeatedNewCustomerPassword: string;

  postPath: string;

  uploadedFiles: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
  ) {
    this.route.params.subscribe(params => {
      if (params.firstName) {
        this.customerService.getCustomerByName(params.firstName).subscribe(notificationCustomer => {
          this.loggedCustomer = notificationCustomer;
          this.customers.push(this.loggedCustomer);
          this.showCustomerDetails = true;
          this.postPath = 'http://localhost:8080/rest/customers/avatar/saveCustomerImage/' + this.loggedCustomer.id;
        });
      }
    });
  }

  saveNewPassword() {
    this.customer = this.cloneCustomer(this.customers[0]);
    this.customerService.logingCustomer(this.customer, this.customerPassword).subscribe(login => {
      if (login) {
        if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
          this.confirmationService.confirm({
            message: 'Sicuro di voler Cambiare la Password?',
            header: 'Aggiornamento Password',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.customer.password = this.newCustomerPassword;
              this.customerService.changeCustomerPsw(this.customer).subscribe(response => {
                if (response) {
                  this.msgs = [{ severity: 'success', summary: 'Aggiornamento Password Completato', detail: 'Password Modificata' }];
                } else {
                  this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'Aggiornamento Password Errato' }];
                }
                this.showChangePassword = false;
              });
            },
            reject: () => { }
          });
        } else {
          this.msgs = [{ severity: 'warn', summary: 'Attenzione', detail: 'Le Password non Corrispondono' }];
        }
      } else {
        this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'La Password Attuale non è Corretta' }];
      }
    });
  }

  successfulUpload() {
    this.msgs = [{ severity: 'success', summary: 'Aggiornamento Avatar Completato', detail: 'Avatar Modificato' }];
    location.reload();
  }

  errorUpload() {
    this.msgs = [{ severity: 'error', summary: 'Immagine Troppo Grande', detail: 'Caricare un\'immagine più piccola!'}];
  }

  cloneCustomer(r: Customer): Customer {
    const ric = { value: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

  deleteAvatar() {
    this.confirmationService.confirm({
      message: 'Sicuro di voler Eliminare il tuo Avatar?',
      header: 'Eliminazione Avatar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loggedCustomer.avatar = false;
        this.loggedCustomer.avatarBase64 = null;
        this.customerService.updateCustomer(this.loggedCustomer).subscribe(response => {
          if (response !== null) {
            this.msgs = [{ severity: 'success', summary: 'Eliminazione Avatar Completata', detail: 'Avatar Eliminato' }];
            location.reload();
          } else {
            this.msgs = [{ severity: 'error', summary: 'Errore', detail: 'Avatar NON Eliminato' }];
          }
        });
      },
      reject: () => { }
    });
  }

}
