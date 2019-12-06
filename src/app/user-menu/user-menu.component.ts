import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  changeMenu() {
    $('.offcanvas-collapse').toggleClass('open')
  }

}
