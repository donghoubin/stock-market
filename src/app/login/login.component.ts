import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  myAppUrl = "http://localhost:8081/authentication/";
  myHttpHead = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private http: HttpClient
  constructor(http: HttpClient,private toastr: ToastrService,private route: ActivatedRoute, private formBuilder: FormBuilder,private router: Router) {
    this.http = http;
    this.loginForm = this.formBuilder.group({
      username:'',
      password:''
    });
   }

  ngOnInit() {
  }

  onSubmit(urlData) {
    const body =  {
        "username": urlData.username,
        "password": urlData.password
      };

    this.http.post(this.myAppUrl+'login', body, this.myHttpHead)
    .subscribe(
          (val) => {
             let result = JSON.parse(JSON.stringify(val));
             if ("success" == result['responseState']) {
                if ("admin" == result['role']) {
                  // admin landing page
                  this.router.navigate(['../adminmenu'],{relativeTo:this.route});     
                } else {
                  // user landing page
                  this.router.navigate(['../usermenu'],{relativeTo:this.route});
                }
                localStorage.setItem("token", result['token'] )
                localStorage.setItem("userId", result['id'] )
                this.toastr.success("Login successfully.");
             } else {
              this.toastr.error("Invalid username and password.");
             }
            
             //console.log(obj.responseState);
            //  angular.forEach(val,function(value,key){
            // });
              // if(val.responseState == 'success') {
              //  let url = val.json().Logging;
              // }
           },
           response => {
                console.log('POST call in error', response);
           },
           () => {
                console.log('The POST observable is now completed.');
                
            });
    this.loginForm.reset();
  }
}
