import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ApplicationService {

  private show_welcome = false;
  countriesObservable: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  categoriesObservable: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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

  setCategoriesItems(items: any[]) {
    this.categoriesObservable.next(items);
  }

  setCountriesItems(items: any[]) {
    this.countriesObservable.next(items);
  }

}
