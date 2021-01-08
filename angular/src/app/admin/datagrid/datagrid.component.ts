import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import CustomStore from '@node_modules/devextreme/data/custom_store';
import { Employee,DatagridService } from './datagrid.service';
import { DatagridServiceProxy } from '@shared/service-proxies/service-proxies';
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
      injector: Injector,
      private _datagridService: DatagridServiceProxy) {
        super(injector);
        //this.employees = _datagridService.getEmployees(),;
        this.selectEmployee = this.selectEmployee.bind(this);
        this.dataSource = new CustomStore({
          key: "id",
          load: () => _datagridService.getEmployees().toPromise().then(response => {
            return {
                data: response
              };
        }),
          insert: (values) => this.service.saveEmployee(values),                    
          update: (key, values) => 
          this.service.updateEmployee(key,values),
          remove: (key) => 
          this.service.deleteEmployee(key),
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
