import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-upload-summary',
  templateUrl: './upload-summary.component.html',
  styleUrls: ['./upload-summary.component.css']
})
export class UploadSummaryComponent implements OnInit {

  companyName; 
  stockExchangeName;
  totalImportedNumber;
  startTime;
  endTime;
  constructor(private route: ActivatedRoute ,private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.companyName = params['companyName'];
      this.stockExchangeName = params['stockExchangeName'];
      this.totalImportedNumber = params['totalImportedNumber'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
  });}
  
  confirmUploaded() {
    this.router.navigate(['../importexcel'],{relativeTo:this.route}); 
  }
}
