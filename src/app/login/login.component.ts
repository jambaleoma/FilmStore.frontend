import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_api/services/customer.service';
import { Router } from '@angular/router';
import { SelectItem } from '../_api/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: SelectItem[];

  psw: string;

  selectedCustomer: string;

  customer: SelectItem;

  showDialog = false;

  customerAutenticate: boolean;

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

  showLoginDilog() {
    this.showDialog = true;
  }

  loginCustomer(password: string) {
    for (let i = 0; i < this.customersItems.length; i++) {
      if (this.customersItems[i].password === password) {
        this.customerAutenticate = true;
        sessionStorage.setItem('customerfirstName', this.customersItems[i].value);
        sessionStorage.setItem('customerId', this.customersItems[i].id);
        break;
      } else {
        this.customerAutenticate = false;
      }
    }
    if (this.customerAutenticate) {
      this.router.navigate(['home']);
      location.reload();
    } else {
      alert('Password Errata');
    }
  }

  close() {
    this.showDialog = false;
  }

}
