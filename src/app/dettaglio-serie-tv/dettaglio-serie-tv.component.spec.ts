import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioSerieTvComponent } from './dettaglio-serie-tv.component';

describe('DettaglioSerieTvComponent', () => {
  let component: DettaglioSerieTvComponent;
  let fixture: ComponentFixture<DettaglioSerieTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioSerieTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioSerieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
