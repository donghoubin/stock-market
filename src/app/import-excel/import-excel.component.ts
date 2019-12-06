import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpClientModule, } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {
  
  myAppUrl = "http://localhost:8081/upload/";
  myAppUrl8083 = "http://localhost:8083/";
  myHttpHead = {
    headers: new HttpHeaders({ 'token': localStorage.getItem('token') })
    
  };
 tokenValue = localStorage.getItem('token');
  uploader:FileUploader = new FileUploader({    
    url: this.myAppUrl + "uploadFile",  
    method: "POST", 
    itemAlias: "file",
    autoUpload: false,
    headers:[
      {name:"token",value:this.tokenValue}
    ]
});
  
  fileData: File = null;
  fileForm;
  
 
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private toastr: ToastrService
    ,private route: ActivatedRoute ,private router: Router) { 
    this.uploader.onSuccessItem = this.successItem.bind(this);
    // this.fileForm = this.formBuilder.group({
    //   uploadfile:''
    // });
  }

  ngOnInit() {
  }
  selectedFileOnChanged() {
    // 这里是文件选择完成后的操作处理
    console.log("choose file");
   
}
uploadfile() {
  console.log("upload file");
  this.uploader.uploadAll();
}

successItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders):any{
  // upload successfully
  if (status == 200) {
    let tempRes = JSON.parse(response); 
    let responseState =  tempRes['responseState']; 
    if ("success" == responseState) {
    let companyName =  tempRes['companyName'];
    let stockExchangeName =  tempRes['stockExchangeName'];
    let totalImportedNumber =  tempRes['totalImportedNumber'];
    let startTime =  tempRes['startTime'];
    let endTime =  tempRes['endTime'];
    this.router.navigate(['../adminmenu/uploadsummary'],{ queryParams: { companyName: companyName,
      stockExchangeName:stockExchangeName,totalImportedNumber:totalImportedNumber,
      startTime: startTime, endTime:endTime } }); 
    this.toastr.success("Upload successfully.");  
  }else {
      this.toastr.error("Fail to upload.");     
    }

  }else {            
    this.toastr.error("Fail to upload.");      
  }
  console.info(response+" for "+item.file.name + " status " + status);
}

}
