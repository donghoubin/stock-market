import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  items;
  userForm;
  myAppUrl = "http://localhost:8081/userservice/";
 //myAppUrl = "http://localhost:8084/company";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient

  constructor(http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router) {
    this.http = http;
    this.userForm = this.formBuilder.group({
      username: '',
      password: '',
      usertype:'',
      email:'',
      mobilenumber:''
    });

  }

  ngOnInit() {
  }
  onSubmit(urlData) {
    const body =  {
        "userName": urlData.username,
        "passWord": urlData.password,
        "userType":urlData.usertype,
        "email":urlData.email,
        "mobileNumber":urlData.mobilenumber
      };

    this.http.post(this.myAppUrl+'user', body, this.myHttpHead)
    .subscribe(
      (val) => {
        //  let result = JSON.parse(JSON.stringify(val));
        this.toastr.success("Add user successfully.");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      response => {
        this.toastr.success("Add user successfully.");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      () => {
        //this.toastr.success("Add company successfully.");

      });
    this.userForm.reset();
  }
}
