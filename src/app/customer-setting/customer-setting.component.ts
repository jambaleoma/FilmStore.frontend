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

  customer: Customer[] = [];

  user: Customer = { value: null };

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
          this.customer.push(notificationCustomer);
          this.showCustomerDetails = true;
          if (this.customer[0].admin) {
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
    this.user = this.cloneCustomer(this.customer[0]);
    if (this.newCustomerPassword === this.repeatedNewCustomerPassword) {
      if (this.customerPassword === this.user.password) {
        this.confirmationService.confirm({
          message: 'Sicuro di voler Cambiare la Password?',
          header: 'Aggiornamento Password',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.user.password = this.newCustomerPassword;
            this.customerService.updateCustomer(this.user).subscribe(response => {
              if (response !== null) {
                this.user = null;
                this.customer = response.filter((val) => val.id === this.customer[0].id) as Customer[];
                this.msgs = [{ severity: 'success', summary: 'Aggiornamento Password Completato', detail: 'Password Modificata' }];
                this.showChangePassword = false;
                this.newCustomerPassword = undefined;
                this.repeatedNewCustomerPassword = undefined;
                this.customerPassword = undefined;
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
