import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CustomerService } from '../_api/services/customer.service';
import { Router } from '@angular/router';
import { Customer } from '../_api/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  customersItems: Customer[];

  psw: string;

  selectedCustomer: string;

  customer: Customer;

  showDialog = false;

  customerAutenticate: boolean;

  @ViewChild('loginPassword') inputEl: ElementRef;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.subsrcibeToListOfCustomers();
  }

  subsrcibeToListOfCustomers() {
    this.customerService.getCustomers().subscribe(notification => {
      this.customersItems = notification;
    });
  }

  showLoginDilog() {
    this.showDialog = true;
    setTimeout(() => {
      this.inputEl.nativeElement.focus();
    }, 0);
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
    this.psw = null;
    this.showDialog = false;
  }

}
