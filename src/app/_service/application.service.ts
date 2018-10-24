import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationService {

  private show_welcome = false;

  constructor() {}

  firstLogin() {
    this.show_welcome = true;
  }

  setFalseShowWelcome() {
    this.show_welcome = false;
  }

  getShowWelcome() {
    return this.show_welcome;
  }

}
