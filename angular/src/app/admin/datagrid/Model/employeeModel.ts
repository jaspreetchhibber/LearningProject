export class EmployeeModel implements IEmployeeModel {
    EmployeeID!: number | undefined;
    FullName!: String | undefined;
    Position!: String | undefined;
    TitleOfCourtesy!: String | undefined;
    BirthDate!: String | undefined;
    HireDate!: String | undefined;
    Address!: String | undefined;
    City!: String | undefined;
    Region!: String | undefined;
    PostalCode!: String | undefined;
    Country!: String | undefined;
    HomePhone!: String | undefined;
    Extension!: String | undefined;
    Photo!: String | undefined;
    Notes!: String | undefined;
    ReportsTo!: Number | undefined;

    constructor(data?: IEmployeeModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.EmployeeID=data["EmployeeID"];
            this.FullName=data["FullName"];
            this.Position=data["Position"];
            this.TitleOfCourtesy=data["TitleOfCourtesy"];
            this.BirthDate=data["BirthDate"];
            this.HireDate=data["HireDate"];
            this.Address=data["Address"];
            this.City=data["City"];
            this.Region=data["Region"];
            this.PostalCode=data["PostalCode"];
            this.Country=data["Country"];
            this.HomePhone=data["HomePhone"];
            this.Extension=data["Extension"];
            this.Photo=data["Photo"];
            this.Notes=data["Notes"];
            this.ReportsTo=data["ReportsTo"];
        }
    }

    static fromJS(data: any): EmployeeModel {
        data = typeof data === 'object' ? data : {};
        let result = new EmployeeModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["EmployeeID"] = this.EmployeeID;
        data["FullName"] = this.FullName;
        data["Position"] = this.Position;
        data["TitleOfCourtesy"] = this.TitleOfCourtesy;
        data["BirthDate"] = this.BirthDate;
        data["HireDate"] = this.HireDate;
        data["Address"] = this.Address;
        data["City"] = this.City;
        data["Region"] = this.Region;
        data["PostalCode"] = this.PostalCode;
        data["Country"] = this.Country;
        data["HomePhone"] = this.HomePhone;
        data["Extension"] = this.Extension;
        data["Photo"] = this.Photo;
        data["Notes"] = this.Notes;
        data["ReportsTo"] = this.ReportsTo;
        return data; 
    }
}

export interface IEmployeeModel {
    EmployeeID: number | undefined;
    FullName: String | undefined;
    Position: String | undefined;
    TitleOfCourtesy: String | undefined;
    BirthDate: String | undefined;
    HireDate: String | undefined;
    Address: String | undefined;
    City: String | undefined;
    Region: String | undefined;
    PostalCode: String | undefined;
    Country: String | undefined;
    HomePhone: String | undefined;
    Extension: String | undefined;
    Photo: String | undefined;
    Notes: String | undefined;
    ReportsTo: Number | undefined;
}