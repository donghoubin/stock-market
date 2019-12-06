import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  companyForm;
  myAppUrl = "http://localhost:8081/companyservice/";
  myHttpHead = { headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient;

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
      this.http=http;
    this.companyForm = this.formBuilder.group({
      id: '',
      companyname: '',
      ceoname: '',
      turnover: '',
      briefdescription: '',
      stockcode:''
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.companyForm.controls['id'].setValue(params['id']);
      this.companyForm.controls['companyname'].setValue(params['companyName']);
      this.companyForm.controls['ceoname'].setValue(params['ceo']);
      this.companyForm.controls['turnover'].setValue(params['turnover']);
      this.companyForm.controls['briefdescription'].setValue(params['brief']);
      this.companyForm.controls['stockcode'].setValue(params['stockcode']);
    });
  }

  onSubmit(urlData) {
    const body =  {
        "id":urlData.id,
        "companyName": urlData.companyname,
        "turnover": urlData.turnover,
        "ceo":urlData.ceoname,
        "brief":urlData.briefdescription,
        "stockCode":urlData.stockcode
      };
      this.http.put(this.myAppUrl+'company', body, this.myHttpHead)
      .subscribe(
      (val) => {
        this.toastr.success("Edit company successfully.");
        this.router.navigate(['../managecompany'], { relativeTo: this.route });
       },
       response => {
        this.toastr.error("Failed to edit company.");
        this.router.navigate(['../managecompany'], { relativeTo: this.route });
       },
       () => {
         //  console.log('put is now completed.');
       });

    this.companyForm.reset();
  }

}
