import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaFilmComponent } from './ricerca-film.component';

describe('RicercaFilmComponent', () => {
  let component: RicercaFilmComponent;
  let fixture: ComponentFixture<RicercaFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicercaFilmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RicercaFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
