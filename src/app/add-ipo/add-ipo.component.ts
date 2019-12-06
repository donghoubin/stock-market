import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-ipo',
  templateUrl: './add-ipo.component.html',
  styleUrls: ['./add-ipo.component.css']
})
export class AddIpoComponent implements OnInit {

  items;
  ipoForm;
  myAppUrl = "http://localhost:8081/companyservice/";
 //myAppUrl = "http://localhost:8084/company";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.http = http;
    this.ipoForm = this.formBuilder.group({
      companyname: '',
      stockexchange: '',
      pricepershare:'',
      totalshares:'',
      opendate:'',
      remarks:''
    });

  }

  ngOnInit() {
  }
  onSubmit(urlData) {
    const body =  {
        "companyName": urlData.companyname,
        "stockExchange": urlData.stockexchange,
        "pricePerShare":urlData.pricepershare,
        "totalShares":urlData.totalshares,
        "openDate":urlData.opendate,
        "remarks":urlData.remarks
      };

    this.http.post(this.myAppUrl+'ipo', body, this.myHttpHead)
    .subscribe(
      (val) => {
        //  let result = JSON.parse(JSON.stringify(val));
        this.toastr.success("Add IPO detail successfully.");
        this.router.navigate(['../manageipo'], { relativeTo: this.route });
      },
      response => {
        this.toastr.error("Failed to add company.");
      },
      () => {
        //this.toastr.success("Add company successfully.");

      });
    this.ipoForm.reset();
  }

}
