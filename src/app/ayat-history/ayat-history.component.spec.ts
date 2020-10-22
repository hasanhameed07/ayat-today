import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyatHistoryComponent } from './ayat-history.component';

describe('AyatHistoryComponent', () => {
  let component: AyatHistoryComponent;
  let fixture: ComponentFixture<AyatHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyatHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
