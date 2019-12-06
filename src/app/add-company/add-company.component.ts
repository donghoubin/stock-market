import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  items;
  companyForm;
  myAppUrl = "http://localhost:8081/companyservice/";
 //myAppUrl = "http://localhost:8084/company";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.http = http;
    this.companyForm = this.formBuilder.group({
      companyname: '',
      ceoname: '',
      turnover:'',
      briefdescription:'',
      stockcode:''
    });

  }

  ngOnInit() {
  }
  onSubmit(urlData) {
    const body =  {
        "companyName": urlData.companyname,
        "turnover": urlData.turnover,
        "ceo":urlData.ceoname,
        "brief":urlData.briefdescription,
        "stockCode":urlData.stockcode
      };

    this.http.post(this.myAppUrl+'company', body, this.myHttpHead)
    .subscribe(
      (val) => {
        //  let result = JSON.parse(JSON.stringify(val));
        this.toastr.success("Add company successfully.");
        this.router.navigate(['../managecompany'], { relativeTo: this.route });
      },
      response => {
        this.toastr.error("Failed to add company.");
      },
      () => {
        //this.toastr.success("Add company successfully.");

      });
    this.companyForm.reset();
  }
}
