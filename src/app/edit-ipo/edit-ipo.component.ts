import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-ipo',
  templateUrl: './edit-ipo.component.html',
  styleUrls: ['./edit-ipo.component.css']
})
export class EditIpoComponent implements OnInit {

  ipoForm;
  myAppUrl = "http://localhost:8081/companyservice/";
  myHttpHead = { headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient;

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
      this.http=http;
    this.ipoForm = this.formBuilder.group({
      id: '',
      companyname: '',
      stockexchange: '',
      pricepershare:'',
      totalshares:'',
      opendate:'',
      remarks:''
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ipoForm.controls['id'].setValue(params['id']);
      this.ipoForm.controls['companyname'].setValue(params['companyName']);
      this.ipoForm.controls['stockexchange'].setValue(params['stockExchange']);
      this.ipoForm.controls['pricepershare'].setValue(params['pricePerShare']);
      this.ipoForm.controls['totalshares'].setValue(params['totalShares']);
      this.ipoForm.controls['opendate'].setValue(params['openDate']);
      this.ipoForm.controls['remarks'].setValue(params['remarks']);
    });
  }

  onSubmit(urlData) {
    const body =  {
        "id":urlData.id,
        "companyName": urlData.companyname,
        "stockExchange": urlData.stockexchange,
        "pricePerShare":urlData.pricepershare,
        "totalShares":urlData.totalshares,
        "openDate":urlData.opendate,
        "remarks":urlData.remarks
      };
      this.http.put(this.myAppUrl+'ipo', body, this.myHttpHead)
      .subscribe(
      (val) => {
        this.toastr.success("Edit IPO successfully.");
        this.router.navigate(['../manageipo'], { relativeTo: this.route });
       },
       response => {
        this.toastr.error("Failed to edit IPO.");
        this.router.navigate(['../manageipo'], { relativeTo: this.route });
       },
       () => {
         //  console.log('put is now completed.');
       });

    this.ipoForm.reset();
  }
}
