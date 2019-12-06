import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-stockexchange',
  templateUrl: './edit-stockexchange.component.html',
  styleUrls: ['./edit-stockexchange.component.css']
})
export class EditStockexchangeComponent implements OnInit {

  stockExchangeForm;
  myAppUrl = "http://localhost:8081/stockexchangeservice/";
  myHttpHead = { headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient;

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
      this.http=http;
    this.stockExchangeForm = this.formBuilder.group({
      id: '',
      stockexchange: '',
      briefdescription: '',
      contactaddress: ''
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.stockExchangeForm.controls['id'].setValue(params['id']);
      this.stockExchangeForm.controls['stockexchange'].setValue(params['stockExchange']);
      this.stockExchangeForm.controls['briefdescription'].setValue(params['brief']);
      this.stockExchangeForm.controls['contactaddress'].setValue(params['contactAddress']);
    });
  }

  onSubmit(urlData) {
    const body =  {
        "id":urlData.id,
        "stockExchange": urlData.stockexchange,
        "brief": urlData.briefdescription,
        "contactAddress":urlData.contactaddress
      };
      this.http.put(this.myAppUrl+'stockexchange', body, this.myHttpHead)
      .subscribe(
      (val) => {
        this.toastr.success("Edit stockexchange successfully.");
        this.router.navigate(['../managestockexchange'], { relativeTo: this.route });
       },
       response => {
        this.toastr.error("Failed to edit stockexchange.");
       },
       () => {
         //  console.log('put is now completed.');
       });

    this.stockExchangeForm.reset();
  }

}
