const FamilyPerson = require('../model/family-person');

class FamilyService {
    constructor(){

    }

    findAllFamilyMemberList(){

        const list = [];
        for (let index = 1; index <= 14; index++) {
            const obj = new FamilyPerson();
            obj.Name = "Name_" + index;
            obj.FullName = "FullName_"+ index;
            obj.Age = index;
            list.push(obj);
        }
        return list;
    }
}


module.exports = FamilyService;