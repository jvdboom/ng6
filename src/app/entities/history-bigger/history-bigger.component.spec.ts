import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBiggerComponent } from './history-bigger.component';

describe('HistoryBiggerComponent', () => {
  let component: HistoryBiggerComponent;
  let fixture: ComponentFixture<HistoryBiggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBiggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBiggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
