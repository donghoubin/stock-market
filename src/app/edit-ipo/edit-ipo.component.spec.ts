/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditIpoComponent } from './edit-ipo.component';

describe('EditIpoComponent', () => {
  let component: EditIpoComponent;
  let fixture: ComponentFixture<EditIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
