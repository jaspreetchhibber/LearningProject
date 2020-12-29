import { Component, OnInit } from '@angular/core';
import { Employee,DatagridService } from './datagrid.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css'],
  providers: [DatagridService]
})
export class DatagridComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee: Employee;
  events: Array<string> = [];

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

    constructor(service: DatagridService) {
        this.employees = service.getEmployees();
        this.selectEmployee = this.selectEmployee.bind(this);
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
    }
    OnUpdatingEmployee(){

    }
    OnRemovingEmployee(){

    }
  ngOnInit() {
  }

}
