/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddIpoComponent } from './add-ipo.component';

describe('AddIpoComponent', () => {
  let component: AddIpoComponent;
  let fixture: ComponentFixture<AddIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
