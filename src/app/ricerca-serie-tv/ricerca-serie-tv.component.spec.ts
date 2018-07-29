import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaSerieTvComponent } from './ricerca-serie-tv.component';

describe('RicercaSerieTvComponent', () => {
  let component: RicercaSerieTvComponent;
  let fixture: ComponentFixture<RicercaSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaSerieTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
