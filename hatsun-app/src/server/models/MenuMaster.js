const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MenuGroupMasterSchema = new Schema({
    GroupName:
    {
        type: String
    },
    IsActive:
    {
        type: String
    },
    WhenEntered:
    {
        type: String
    },
    WhenModified:
    {
        type: String
    },
    IsIcon:
    {
        type: String
    },
    ColorCode:
    {
        type: String
    },
    MainModuleId:
    {
        type: String
    },
    IsWebsite:
    {
        type: String
    },
    IsAdminCP:
    {
        type: String
    },
    SequenceNo:
    {
        type: String
    },
    Description:
    {
        type: String
    },
    PageUrl:
    {
        type: String
    }
})

const MenuModuleSchema = new Schema({
    MenuGroupId:
    {
        type: String
    },
    ModuleName:
    {
        type: String
    },
    WhenEntered:
    {
        type: String
    },
    WhenModified:
    {
        type: String
    },
    IsActive:
    {
        type: String
    },
    IsIcon:
    {
        type: String
    },
    Image:
    {
        type: String
    },
    PageUrl:
    {
        type: String
    },
    WebUrl:
    {
        type: String
    },
    SequenceNo:
    {
        type: String
    },
    Description:
    {
        type: String
    }
})

const AccessModuleSchema = new Schema({
    MenuGroupId:
    {
        type: String
    },
    ModuleName:
    {
        type: String
    },
    WhenEntered:
    {
        type: String
    },
    WhenModified:
    {
        type: String
    },
    IsActive:
    {
        type: String
    },
    IsIcon:
    {
        type: String
    },
    Image:
    {
        type: String
    },
    PageUrl:
    {
        type: String
    },
    WebUrl:
    {
        type: String
    },
    SequenceNo:
    {
        type: String
    },
    Description:
    {
        type: String
    }
})

const MenuSetupSchema = new Schema({})
const MenuSetupListSchema = new Schema({})

const MenuMaster = mongoose.model('MenuMaster', MenuGroupMasterSchema, "MenuGroupMaster")
const MenuModuleMaster = mongoose.model('MenuModuleMaster', MenuModuleSchema, "MenuModule")
const AccessModuleMaster = mongoose.model('AccessModuleMaster', AccessModuleSchema, "AccessModuleMaster")
const MenuSetupMaster = mongoose.model('MenuSetupMaster',MenuSetupSchema, "RoleAccessRelation")
const MenuSetupList = mongoose.model('MenuSetupList',MenuSetupListSchema, "MenuSetup")
module.exports = {
    MenuMaster: MenuMaster,
    MenuModuleMaster: MenuModuleMaster,
    AccessModuleMaster: AccessModuleMaster,
    MenuSetupMaster: MenuSetupMaster,
    MenuSetupList: MenuSetupList
}
// module.exports = MenuMaster