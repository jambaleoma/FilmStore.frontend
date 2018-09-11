import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneSerieTvComponent } from './gestione-serie-tv.component';

describe('GestioneSerieTvComponent', () => {
  let component: GestioneSerieTvComponent;
  let fixture: ComponentFixture<GestioneSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneSerieTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
