import { Customer } from './../_api/models/customer';
import { CustomerService } from './../_api/services/customer.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {

  customer: Customer = {
    value: null
  };

  repeatPassword: string;

  sesso: string;

  disableSave = true;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'backImage');
  }

  sessoCheck(s: string) {
    this.sesso = s;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  saveCustomer() {
    console.log(this.customer);
  }

}
