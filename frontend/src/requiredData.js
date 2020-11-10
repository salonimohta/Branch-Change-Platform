/* 
All the information about branch, course and department is used from this file, it is mostly used in BranchChangeRequestForm Component
Branch/Course/Dept is hardcoded as of now.
getKeyByValue is a function that gives a key for the corresponding value in a javascript object
courseValueToIdMapping is a constant object containing the mapping from Value of course to id of course as present in db
courseValueToNameMapping is a constant object containing the mapping from Value of course to Name of course as present in db
deptByCourseCategory is a constant object containing the mapping of deptValues with Courses (self-assumed variable)
deptValuesDropdown is a constant object containing the mapping of Course Values to an array of departments which belong to the course
branchByCourseAndDeptCategory is a constant object of objects where each course has been mapped to objects of departments it belongs to which is further mapped to an array of branches which fall into the respective departent
branchValuesDropdown is a similar structure like branchByCourseAndDeptCategory, except instead of names of branches, ids of branches are used
branchNameValueMapping is a constant object containing the mapping of branch values used in code to branch names as present in db
deptNameValueMapping is a constant object containing the mapping of dept values used in code to dept names as present in db
*/

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
  