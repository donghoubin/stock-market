/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IpoListComponent } from './ipo-list.component';

describe('IpoListComponent', () => {
  let component: IpoListComponent;
  let fixture: ComponentFixture<IpoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
