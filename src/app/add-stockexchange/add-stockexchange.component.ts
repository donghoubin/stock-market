import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stockexchange',
  templateUrl: './add-stockexchange.component.html',
  styleUrls: ['./add-stockexchange.component.css']
})
export class AddStockexchangeComponent implements OnInit {
  items;
  stockExchangeForm;
  myAppUrl = "http://localhost:8081/stockexchangeservice/";
 //myAppUrl = "http://localhost:8084/company";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.http = http;
    this.stockExchangeForm = this.formBuilder.group({
      stockexchange: '',
      briefdescription: '',
      contactaddress:''
    });

  }

  ngOnInit() {
  }
  onSubmit(urlData) {
    const body =  {
        "stockExchange": urlData.stockexchange,
        "brief": urlData.briefdescription,
        "contactAddress":urlData.contactaddress
      };

    this.http.post(this.myAppUrl+'stockexchange', body, this.myHttpHead)
    .subscribe(
      (val) => {
        this.toastr.success("Add stockexchange successfully.");
        this.router.navigate(['../managestockexchange'], { relativeTo: this.route });
      },
      response => {
        this.toastr.error("Failed to add stockexchange.");
      },
      () => {    

      });
    this.stockExchangeForm.reset();
  }

}
