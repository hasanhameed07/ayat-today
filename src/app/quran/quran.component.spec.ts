/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuranComponent } from './quran.component';

describe('QuranComponent', () => {
  let component: QuranComponent;
  let fixture: ComponentFixture<QuranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
