import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiesteUtenteComponent } from './richieste-utente.component';

describe('RichiesteUtenteComponent', () => {
  let component: RichiesteUtenteComponent;
  let fixture: ComponentFixture<RichiesteUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichiesteUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichiesteUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
