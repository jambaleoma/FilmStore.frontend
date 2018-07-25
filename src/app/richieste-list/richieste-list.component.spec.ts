import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiesteListComponent } from './richieste-list.component';

describe('RichiesteListComponent', () => {
  let component: RichiesteListComponent;
  let fixture: ComponentFixture<RichiesteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichiesteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichiesteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
