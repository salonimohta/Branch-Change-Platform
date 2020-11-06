export function getKeyByValue(object, value) { 
    for (var prop in object) { 
        if (object.hasOwnProperty(prop)) { 
            if (object[prop].toLowerCase() === value) 
            return prop; 
        } 
    } 
  } 

export const courseValueToIdMapping={
  BTech: "b.tech",
  Int_MTech: "int.m.tech",
  DualDegree: "dualdegree"
}

export const courseValueToNameMapping={
  BTech: "Bachelor Of Technology",
  Int_MTech: "Integrated Master Of Technology",
  DualDegree: "Dual Degree"
}

  
export const deptByCourseCategory = {
    BTech: ["Computer Science and Engineering","Electronics Engineering","Electrical Engineering","Civil Engineering"],
    DualDegree: ["Computer Science and Engineering"],
    Int_MTech: ["Mathematics and Computing","Applied Geology","Applied Geophysics"]
  }
  
export const deptValuesDropdown = {
    BTech: ["cse","ece","ee","cve"],
    DualDegree: ["cse"],
    Int_MTech: ["mnc","agl","agp"]
  }
  
export const branchByCourseAndDeptCategory = {
      BTech: {cse:["Computer Science and Engineering"],ece:["Electronics and Communication Engineering"],ee:["Electrical Engineering"],cve:["Civil Engineering"]},
      DualDegree: {cse:["Computer Science and Engineering+Computer Science and Engineering"]},
      Int_MTech: {mnc:["Mathematics and Computing"],agl:["Applied Geology"],agp:["Applied Geophysics"]}
  }
  
export const branchValuesDropdown = {
    BTech: {cse:["cse"],ece:["ece"],ee:["ee"],cve:["civ"]},
    DualDegree: {cse:["cse+cse"]},
    Int_MTech: {mnc:["mnc"],agl:["agl"],agp:["agp"]}
  }
  
export const branchNameValueMapping = {
    cse: "Computer Science and Engineering",
    ece: "Electronics and Communication Engineering",
    ee: "Electrical Engineering",
    civ: "Civil Engineering",
    agl: "Applied Geology",
    agp: "Applied Geophysics",
    mnc: "Mathematics and Computing"
  }
  
export const deptNameValueMapping = {
    cse: "Computer Science and Engineering",
    ece: "Electronics Engineering",
    ee: "Electrical Engineering",
    cve: "Civil Engineering",
    agl: "Applied Geology",
    agp: "Applied Geophysics",
    mnc: "Mathematics and Computing"
  }
  