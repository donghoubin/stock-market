import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { FormBuilder } from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute} from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-compare-sector',
  templateUrl: './compare-sector.component.html',
  styleUrls: ['./compare-sector.component.css']
})
export class CompareSectorComponent implements OnInit {

  items;
  companycompareForm;
  companyTitle;
  companyDate;
  companySeries;
  isShow;
  myAppUrl = "http://localhost:8081/companyservice/";
  myHttpHead = {   headers: new HttpHeaders({ 'token': localStorage.getItem('token') }) };
  private http: HttpClient;
 
  chartOption: EChartOption =  {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {   
        data:this.companyTitle
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:this.companyDate
    },
    yAxis: {
        type: 'value'
    },
    series: [
       
    ]
};

  constructor(http: HttpClient, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.http = http;
    this.http.get(this.myAppUrl+"companies", this.myHttpHead).subscribe((data)=>{
      this.items = data;
    //  console.log("result"+this.items);
    });
    this.companycompareForm = this.formBuilder.group({
     choosecompany: '',
      fromperiod: '',
      toperiod:'',
      periodicity:'1',
      chooseothercompany:''
    });
   }

  ngOnInit() {
    this.isShow = false;
  }

  onSubmit(urlData) {
    console.log("valll+" + urlData);
    const body = {
      "companyId": urlData.choosecompany,
      "startTime": urlData.fromperiod,
      "endTime": urlData.toperiod,
      "periodicity": urlData.periodicity
    };
    let companyTitleArray: Array<string> = [];
    // companyTitleArray.push('邮件营销');
    let companyDateArray: Array<string> = [];
    //companyDateArray.push('周一');
    let companySeriesArray: Array<object> = [];
    let companyDataArray: Array<string> = [];

    let tempCompanyTile = '';
    // another company
    let otherCompanyDateArray: Array<string> = [];
    let tempOtherCompanyDataArray: Array<string> = [];
    let otherCompanyDataArray: Array<string> = [];

    //   let object= {
    //     name:'邮件营销',
    //     type:'line',
    //     stack: '总量',
    //     data:[120]
    // } ; 
    // companySeriesArray.push(object);
    this.http.post(this.myAppUrl + 'companiesStockPrice', body, this.myHttpHead)
      .subscribe(
        (val) => {
          for (let info in val) {
            let tempRes = val[info];
            tempCompanyTile = tempRes[2];
            // companyTitleArray.push(tempRes[2]);
            companyDateArray.push(tempRes[0]);
            companyDataArray.push(tempRes[1]);
            // console.log("dates:" + tempRes[0])
            // console.log("currentPrice:" + tempRes[1])
            // console.log("companyName:" + tempRes[2])
          }
          companyTitleArray.push(tempCompanyTile);
          let object = {
            name: companyTitleArray[0],
            type: 'line',
            stack: '总量',
            data: companyDataArray
          };
          companySeriesArray.push(object);
          this.companyTitle = companyTitleArray;
          this.companyDate = companyDateArray;
          this.companySeries = companySeriesArray;
          this.chartOption = {
            title: {
              text: ''
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: this.companyTitle
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.companyDate
            },
            yAxis: {
              type: 'value'
            },
            series: this.companySeries
          };
          // aother company

          let anotherCompany = urlData.chooseothercompany;
          console.log("anotherCompany:" + anotherCompany);
          if (anotherCompany != '') {
            const body1 = {
              "companyId": anotherCompany,
              "startTime": urlData.fromperiod,
              "endTime": urlData.toperiod,
              "periodicity": urlData.periodicity
            };
            this.http.post(this.myAppUrl + 'companiesStockPrice', body1, this.myHttpHead)
              .subscribe(
                (val) => {
                  for (let info in val) {
                    let tempRes = val[info];
                    tempCompanyTile = tempRes[2];
                    otherCompanyDateArray.push(tempRes[0]);         
                    tempOtherCompanyDataArray.push(tempRes[1]);
                  }  
                  let getDate = false;
                  console.log("companyDateArray:" +companyDateArray);
                  for(let originalDate in companyDateArray) {
                    for(let otherDate in otherCompanyDateArray) {
                    if (companyDateArray[originalDate] == otherCompanyDateArray[otherDate]) {
                    otherCompanyDataArray.push(tempOtherCompanyDataArray[otherDate]);
                    getDate =true;
                    } 
                  }
                  if(!getDate) {
                    console.log("initail 0 :");
                   otherCompanyDataArray.push('0');
                  }
                  }
               
                  
                  companyTitleArray.push(tempCompanyTile)
                  console.log("companyTitleArray1:" + companyTitleArray);
                  console.log("companyDateArray1:" + companyDateArray);
                  let object = {
                    name: companyTitleArray[1],
                    type: 'line',
                    stack: '总量',
                    data: otherCompanyDataArray
                  };
                  companySeriesArray.push(object);
                  console.log("companySeriesArray1:" + companySeriesArray);
                  this.companyTitle = companyTitleArray;
                  this.companyDate = companyDateArray;
                  this.companySeries = companySeriesArray;
                  this.chartOption = {
                    title: {
                      text: ''
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: this.companyTitle
                    },
                    grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                    },
                    toolbox: {
                      feature: {
                        saveAsImage: {}
                      }
                    },
                    xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: this.companyDate
                    },
                    yAxis: {
                      type: 'value'
                    },
                    series: this.companySeries
                  };
                },
                response => {
                  this.toastr.error("Failed to generate map.");
                },
                () => {
      
                });
          }
        },
        response => {
          this.toastr.error("Failed to generate map.");
        },
        () => {

        });

 
    this.companycompareForm.reset();
  }

  showCompany(){
    console.log("show");
    this.isShow = true;
  }
}
