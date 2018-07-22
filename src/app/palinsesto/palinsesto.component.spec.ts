import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalinsestoComponent } from './palinsesto.component';

describe('PalinsestoComponent', () => {
  let component: PalinsestoComponent;
  let fixture: ComponentFixture<PalinsestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalinsestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalinsestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
