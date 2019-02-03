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
export class CustomerSettingComponent implements OnInit {

  customers: Customer[] = [];

  customer: Customer = { value: null };

  msgs: Message[] = [];

  showCustomerDetails = false;

  adminCheck = false;

  normalUser = false;

  showChangePassword = false;

  customerPassword: string;

  newCustomerPassword: string;

  repeatedNewCustomerPassword: string;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
  ) {
    this.route.params.subscribe(params => {
      if (params.firstName) {
        this.customerService.getCustomerByName(params.firstName).subscribe(notificationCustomer => {
          this.customers.push(notificationCustomer);
          this.showCustomerDetails = true;
          if (this.customers[0].admin) {
            this.adminCheck = true;
            this.normalUser = false;
          } else {
            this.adminCheck = false;
            this.normalUser = true;
          }
        });
      }
    });
  }

  ngOnInit() {
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

  cloneCustomer(r: Customer): Customer {
    const ric = { value: null };
    // tslint:disable-next-line:forin
    for (const prop in r) {
      ric[prop] = r[prop];
    }
    return ric;
  }

}
