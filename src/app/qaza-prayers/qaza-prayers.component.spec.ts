/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QazaPrayersComponent } from './qaza-prayers.component';

describe('QazaPrayersComponent', () => {
  let component: QazaPrayersComponent;
  let fixture: ComponentFixture<QazaPrayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QazaPrayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QazaPrayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
