import { HttpClient,HttpHeaders,HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import 'devextreme/data/odata/store';
import { Observable,throwError as _observableThrow, of as _observableOf  } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { EmployeeModel } from './Model/employeeModel';
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class DatagridService {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  
  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  getEmployees(): Employee[] {
    debugger;
    return employees;
  }

      /**
     * @param model (optional) 
     * @return Success
     */
    saveEmployee(model: EmployeeModel | null | undefined): Observable<EmployeeResultModel> {
      //saveEmployee(model: any | null | undefined): Observable<EmployeeResultModel> {
        debugger;
      let url_ = this.baseUrl + "/api/Home/AddEmployee";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(model);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json", 
              "Accept": "application/json"
          })
      };

      return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processSaveEmployee(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processSaveEmployee(<any>response_);
              } catch (e) {
                  return <Observable<EmployeeResultModel>><any>_observableThrow(e);
              }
          } else
              return <Observable<EmployeeResultModel>><any>_observableThrow(response_);
      }));
  }
  protected processSaveEmployee(response: HttpResponseBase): Observable<EmployeeResultModel> {
    const status = response.status;
    const responseBlob = 
        response instanceof HttpResponse ? response.body : 
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
    if (status === 200) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = EmployeeResultModel.fromJS(resultData200);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<EmployeeResultModel>(<any>null);
}
}
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader(); 
          reader.onload = event => { 
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob); 
      }
  });
}
export class ApiException extends Error {
  message: string;
  status: number; 
  response: string; 
  headers: { [key: string]: any; };
  result: any; 

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
  }
}



export interface Employee {
  EmployeeID: Number,
  FullName: String,
  Position: String,
  TitleOfCourtesy: String,
  BirthDate: String,
  HireDate: String,
  Address: String,
  City: String,
  Region: String,
  PostalCode: String,
  Country: String,
  HomePhone: String,
  Extension: String,
  Photo: String,
  Notes: String,
  ReportsTo: Number
}

const employees: Employee[] = [{
  "EmployeeID": 1,
  "FullName": "Nancy Davolio",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Ms.",
  "BirthDate": "1968-12-08T00:00:00.000Z",
  "HireDate": "2011-05-01T00:00:00.000Z",
  "Address": "507 - 20th Ave. E.\r\nApt. 2A",
  "City": "Seattle",
  "Region": "WA",
  "PostalCode": "98122",
  "Country": "USA",
  "HomePhone": "(206) 555-9857",
  "Extension": "5467",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png",
  "Notes": "Education includes a BA in psychology from Colorado State University in 1990.  She also completed \"The Art of the Cold Call.\"  Nancy is a member of Toastmasters International.",
  "ReportsTo": 2
}, {
  "EmployeeID": 2,
  "FullName": "Andrew Fuller",
  "Position": "Vice President, Sales",
  "TitleOfCourtesy": "Dr.",
  "BirthDate": "1972-02-19T00:00:00.000Z",
  "HireDate": "2011-08-14T00:00:00.000Z",
  "Address": "908 W. Capital Way",
  "City": "Tacoma",
  "Region": "WA",
  "PostalCode": "98401",
  "Country": "USA",
  "HomePhone": "(206) 555-9482",
  "Extension": "3457",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/02.png",
  "Notes": "Andrew received his BTS commercial in 1994 and a Ph.D. in international marketing from the University of Dallas in 2001.  He is fluent in French and Italian and reads German.  He joined the company as a sales representative, was promoted to sales manager in January 2012 and to vice president of sales in March 2013.  Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.",
  "ReportsTo": null
}, {
  "EmployeeID": 3,
  "FullName": "Janet Leverling",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Ms.",
  "BirthDate": "1983-08-30T00:00:00.000Z",
  "HireDate": "2011-04-01T00:00:00.000Z",
  "Address": "722 Moss Bay Blvd.",
  "City": "Kirkland",
  "Region": "WA",
  "PostalCode": "98033",
  "Country": "USA",
  "HomePhone": "(206) 555-3412",
  "Extension": "3355",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/09.png",
  "Notes": "Janet has a BS degree in chemistry from Boston College (2004).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 2011 and promoted to sales representative in February 2012.",
  "ReportsTo": 2
}, {
  "EmployeeID": 4,
  "FullName": "Margaret Peacock",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Mrs.",
  "BirthDate": "1957-09-19T00:00:00.000Z",
  "HireDate": "2012-05-03T00:00:00.000Z",
  "Address": "4110 Old Redmond Rd.",
  "City": "Redmond",
  "Region": "WA",
  "PostalCode": "98052",
  "Country": "USA",
  "HomePhone": "(206) 555-8122",
  "Extension": "5176",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/04.png",
  "Notes": "Margaret holds a BA in English literature from Concordia College (1978) and an MA from the American Institute of Culinary Arts (1986).  She was assigned to the London office temporarily from July through November 2012.",
  "ReportsTo": 2
}, {
  "EmployeeID": 5,
  "FullName": "Steven Buchanan",
  "Position": "Sales Manager",
  "TitleOfCourtesy": "Mr.",
  "BirthDate": "1975-03-04T00:00:00.000Z",
  "HireDate": "2012-10-17T00:00:00.000Z",
  "Address": "14 Garrett Hill",
  "City": "London",
  "Region": "UK",
  "PostalCode": "SW1 8JR",
  "Country": "UK",
  "HomePhone": "(71) 555-4848",
  "Extension": "3453",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/05.png",
  "Notes": "Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1996.  Upon joining the company as a sales representative in 2012, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London.  He was promoted to sales manager in March 2013.  Mr. Buchanan has completed the courses \"Successful Telemarketing\" and \"International Sales Management.\"  He is fluent in French.",
  "ReportsTo": 2
}, {
  "EmployeeID": 6,
  "FullName": "Michael Suyama",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Mr.",
  "BirthDate": "1983-07-02T00:00:00.000Z",
  "HireDate": "2012-10-17T00:00:00.000Z",
  "Address": "Coventry House\r\nMiner Rd.",
  "City": "London",
  "Region": "UK",
  "PostalCode": "EC2 7JR",
  "Country": "UK",
  "HomePhone": "(71) 555-7773",
  "Extension": "428",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/01.png",
  "Notes": "Michael is a graduate of Sussex University (MA, economics, 2003) and the University of California at Los Angeles (MBA, marketing, 2006). He has also taken the courses \"Multi-Cultural Selling\" and \"Time Management for the Sales Professional.\"  He is fluent in Japanese and can read and write French, Portuguese, and Spanish.",
  "ReportsTo": 5
}, {
  "EmployeeID": 7,
  "FullName": "Robert King",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Mr.",
  "BirthDate": "1980-05-29T00:00:00.000Z",
  "HireDate": "2012-01-02T00:00:00.000Z",
  "Address": "Edgeham Hollow\r\nWinchester Way",
  "City": "London",
  "Region": "UK",
  "PostalCode": "RG1 9SP",
  "Country": "UK",
  "HomePhone": "(71) 555-5598",
  "Extension": "465",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png",
  "Notes": "Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan in 2002, the year he joined the company.  After completing a course entitled \"Selling in Europe,\" he was transferred to the London office in March 2013.",
  "ReportsTo": 5
}, {
  "EmployeeID": 8,
  "FullName": "Laura Callahan",
  "Position": "Inside Sales Coordinator",
  "TitleOfCourtesy": "Ms.",
  "BirthDate": "1978-01-09T00:00:00.000Z",
  "HireDate": "2012-03-05T00:00:00.000Z",
  "Address": "4726 - 11th Ave. N.E.",
  "City": "Seattle",
  "Region": "WA",
  "PostalCode": "98105",
  "Country": "USA",
  "HomePhone": "(206) 555-1189",
  "Extension": "2344",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/08.png",
  "Notes": "Laura received a BA in psychology from the University of Washington.  She has also completed a course in business French.  She reads and writes French.",
  "ReportsTo": 2
}, {
  "EmployeeID": 9,
  "FullName": "Brett Wade",
  "Position": "Sales Representative",
  "TitleOfCourtesy": "Mr.",
  "BirthDate": "1986-01-27T00:00:00.000Z",
  "HireDate": "2012-11-15T00:00:00.000Z",
  "Address": "7 Houndstooth Rd.",
  "City": "London",
  "Region": "UK",
  "PostalCode": "WG2 7LT",
  "Country": "UK",
  "HomePhone": "(71) 555-4444",
  "Extension": "452",
  "Photo": "https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/03.png",
  "Notes": "Brett has a BA degree in English from St. Lawrence College.  He is fluent in French and German.",
  "ReportsTo": 5
}];

export interface IEmployeeResultModel {
  tenancyName: string;
}

export class EmployeeResultModel implements IEmployeeResultModel {
  //state!: TenantAvailabilityState | undefined;
  tenantId!: number | undefined;
  serverRootAddress!: string | undefined;

  constructor(data?: IEmployeeResultModel) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }
  tenancyName: string;

  init(data?: any) {
      if (data) {
          //this.state = data["state"];
          this.tenantId = data["tenantId"];
          this.serverRootAddress = data["serverRootAddress"];
      }
  }

  static fromJS(data: any): EmployeeResultModel {
      data = typeof data === 'object' ? data : {};
      let result = new EmployeeResultModel();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      //data["state"] = this.state;
      data["tenantId"] = this.tenantId;
      data["serverRootAddress"] = this.serverRootAddress;
      return data; 
  }
}
