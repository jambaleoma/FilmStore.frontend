import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersListaComponent } from './customers-lista.component';

describe('CustomersListaComponent', () => {
  let component: CustomersListaComponent;
  let fixture: ComponentFixture<CustomersListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
