import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import CustomStore from 'devextreme/data/custom_store';
import { Employee,DatagridService } from './datagrid.service';
//import { EmployeeModel } from './Model/employeeModel';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css'],
  providers: [DatagridService]
})
export class DatagridComponent extends AppComponentBase implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee;
  events: Array<string> = [];
  dataSource: any;

    collapsed = false;
    contentReady = (e) => {
        if(!this.collapsed) {
            this.collapsed = true;
            e.component.expandRow(["EnviroCare"]);
        }
    };
    customizeTooltip = (pointsInfo) => {
        return { text: parseInt(pointsInfo.originalValue) + "%" };
    }

    constructor(public service: DatagridService,
      injector: Injector) {
        super(injector);
        //this.employees = service.getEmployees();
        this.selectEmployee = this.selectEmployee.bind(this);
        this.dataSource = new CustomStore({
          key: "Id",
          load: () => service.getEmployees(),
          insert: (values) => 
          this.service.saveEmployee(values),          
          // update: (key, values) => this.sendRequest(URL + "/UpdateOrder", "PUT", {
          //     key: key,
          //     values: JSON.stringify(values)
          // }),
          // remove: (key) => this.sendRequest(URL + "/DeleteOrder", "DELETE", {
          //     key: key
          // })
        })
        
    }
    selectEmployee(e) {
      e.component.byKey(e.currentSelectedRowKeys[0]).done(employee => {
          if(employee) {
              this.selectedEmployee = employee;
          }
      });
    }

    logEvent(eventName) {
      debugger;
      this.events.unshift(eventName);
    }
    
    refreshEmployeeGrid(){
      //this.employees = service.getEmployees();
      this.selectEmployee = this.selectEmployee.bind(this);
    }
    OnSavingEmployee(){
      debugger;
      //this.service.saveEmployee(this.formData);
    }
    
    OnUpdatingEmployee(){

    }
    OnRemovingEmployee(){

    }

    // sendRequest(url: string, method: string = "GET", data: any = {}): any {
  //     //this.logRequest(method, url, data);

  //     let httpParams = new HttpParams({ fromObject: data });
  //     let httpOptions = { withCredentials: true, body: httpParams };
  //     let result;

  //     switch(method) {
  //         case "GET":
  //             result = this.http.get(url, httpOptions);
  //             break;
  //         case "PUT":
  //             result = this.http.put(url, httpParams, httpOptions);
  //             break;
  //         case "POST":
  //             result = this.http.post(url, httpParams, httpOptions);
  //             break;
  //         case "DELETE":
  //             result = this.http.delete(url, httpOptions);
  //             break;
  //     }

  //     return result
  //         .toPromise()
  //         .then((data: any) => {
  //             return method === "GET" ? data.data : data;
  //         })
  //         .catch(e => {
  //             throw e && e.error && e.error.Message;
  //         });
  // }
  ngOnInit() {
  }

}
