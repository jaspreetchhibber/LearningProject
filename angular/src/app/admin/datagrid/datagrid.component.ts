import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import CustomStore from '@node_modules/devextreme/data/custom_store';
import { DatagridServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css']
})
export class DatagridComponent extends AppComponentBase implements OnInit {
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

    constructor(
      injector: Injector,
      private _datagridService: DatagridServiceProxy) {
        super(injector);
        this.dataSource = new CustomStore({
          key: "Id",
          load: () => _datagridService.getEmployees().toPromise().then(response => {
            return {
                data: response.items
              };
        }),
          insert: (values) => _datagridService.saveEmployee(values).toPromise().then(response => {
            debugger;
            return {
                data: response
              };
        }),                    
          update: (key, values) => 
          _datagridService.updateEmployee(key,values).toPromise().then(response => {
            debugger;
            return {
                data: response
              };
        }),
          remove: (key) => 
          _datagridService.deleteEmployee(key).toPromise().then(response => {
            debugger;
            return {
                data: response
              };
          })
        })
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
