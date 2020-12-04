export class CustomerModel {
    CustomerID: String;
    CustomerName: String;
    Address: String;
    Country: String;
    State: String;
    District: String;
    PinCode: Number;
    Contact: String;
    Email: String;
    Mobile: String;
    WhenEntered: String;
    WhenModified: String;
    IsActive:boolean

    constructor() {

    }
}

export class CustomerSelectionFilterModel {
    CustomerID: String;
    Country: String;
    State: String;
    Distrcit: String;
    IsActive: String;
    constructor() {

    }
}
