import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../../node_modules/primeng/api';
import { CustomerService } from '../_api/services/customer.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: SelectItem[];

  selectedCustomer: string;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customersItems = notification as SelectItem[];
    });
  }

  selectSessionCustomer() {
    sessionStorage.setItem('customer', this.selectedCustomer.toString() );
  }

  loginCustomer() {
    this.router.navigate(['home']);
  }

}
