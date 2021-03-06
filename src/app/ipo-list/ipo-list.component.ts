import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ipo-list',
  templateUrl: './ipo-list.component.html',
  styleUrls: ['./ipo-list.component.css']
})
export class IpoListComponent implements OnInit {
  items;
  companyForm;
  myAppUrl = "http://localhost:8081/companyservice/";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient;

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) { 
      this.http = http;
    this.http.get(this.myAppUrl+"ipos", this.myHttpHead).subscribe((data)=>{
      this.items = data;
    //  console.log("result"+this.items);
    });
  }
  ngOnInit() {
  }

}
