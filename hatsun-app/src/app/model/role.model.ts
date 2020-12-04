export class RoleModel {
    RoleID: String;
    RoleName: String;
    Description: String;
    DealerID: String;
    AccessIDs: String;
    RegionIDs: String;
    SubRegion1IDs: String;
    SubRegion2IDs: String;
    WhenEntered: String;
    WhenModified: String;
    IsActive: boolean;
    BEID: String;
    IsGobal: boolean;
    CustomerID: String;

    constructor() {

    }
}

export class MenuSetup {
    GroupId: String;
    GroupName: String;
    MenuModuleName: String;
    AccessMenus: any;
}

export class AccessMenu {
    AccessModuleName: String;
    Roles : String[];
}

export class RoleSelectionFilterModel {
    RoleId: String;
    Status : String;
}

