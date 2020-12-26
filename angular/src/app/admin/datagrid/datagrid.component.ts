import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
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

  dataSource: DataSource;
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
        this.dataSource = service.getDataSource();
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
  ngOnInit() {
  }

}
