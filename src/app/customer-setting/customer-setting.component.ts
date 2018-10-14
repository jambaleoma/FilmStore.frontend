import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../_api/models';

@Component({
  selector: 'app-customer-setting',
  templateUrl: './customer-setting.component.html',
  styleUrls: ['./customer-setting.component.scss']
})
export class CustomerSettingComponent implements OnInit {

  customer: Customer;
  loggedCustomer: Customer;
  customerPassword = undefined;
  newCustomerPassword = undefined;
  repeatedNewCustomerPassword = undefined;
  showChangePassword = false;
  displayDialog = true;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
    ) {
      this.customerService.getCustomerByName(sessionStorage.getItem('customerfirstName')).subscribe(notification => {
        this.loggedCustomer = notification;
      });
    this.route.params.subscribe(params => {
      if (params.id) {
        this.customerService.getCustomerById(params.id).subscribe(notificationCustomer => {
          this.customer = notificationCustomer;
        });
      }
    });
   }

  ngOnInit() {
  }

}
