/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HijriDateComponent } from './hijri-date.component';

describe('HijriDateComponent', () => {
  let component: HijriDateComponent;
  let fixture: ComponentFixture<HijriDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HijriDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HijriDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
