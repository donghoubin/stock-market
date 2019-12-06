import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

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
      id:'',
      username: '',
      password: '',
      usertype:'',
      email:'',
      mobilenumber:''
    });

  }

  ngOnInit() {
    this.http.get(this.myAppUrl+'userInfo/'+localStorage.getItem("userId")).subscribe((data)=>{
      let result = JSON.parse(JSON.stringify(data));
      this.userForm.controls['id'].setValue(result['id']);
      this.userForm.controls['username'].setValue(result['userName']);
      this.userForm.controls['password'].setValue(result['passWord']);
      this.userForm.controls['usertype'].setValue(result['userType']);
      this.userForm.controls['email'].setValue(result['email']);
      this.userForm.controls['mobilenumber'].setValue(result['mobileNumber']);
    //  console.log("result"+this.items);
    });;
  }
  onSubmit(urlData) {
    const body =  {
        "id":urlData.id,
        "userName": urlData.username,
        "passWord": urlData.password,
        "userType":urlData.usertype,
        "email":urlData.email,
        "mobileNumber":urlData.mobilenumber
      };

    this.http.put(this.myAppUrl+'user', body, this.myHttpHead)
    .subscribe(
      (val) => {
        //  let result = JSON.parse(JSON.stringify(val));
        this.toastr.success("Edit user successfully.");
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      response => {
        this.toastr.error("Failed to edit user.");
      },
      () => {
        //this.toastr.success("Add company successfully.");

      });
    this.userForm.reset();
  }

}
