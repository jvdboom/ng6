import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBigComponent } from './history-big.component';

describe('HistoryBigComponent', () => {
  let component: HistoryBigComponent;
  let fixture: ComponentFixture<HistoryBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
