import jsPDF from "jspdf";
import "jspdf-autotable";
import {getKeyByValue,courseValueToNameMapping,courseValueToIdMapping} from './../requiredData';


// define a generatePDF function that accepts a tickets argument
export const viewRequestGeneratePDF = applications => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Preference #", "Course", "Branch", "Department"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  applications.forEach((application,index) => {
    const applicationData = [
      index+1,
      courseValueToNameMapping[getKeyByValue(courseValueToIdMapping,application.branchChangeApplication.course_id)],
      application.branchDetails.name,
      application.departmentDetails.name
    ];
    // push each tickcet's info into a row
    tableRows.push(applicationData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // ticket title. and margin-top + margin-left
  doc.text("Your Branch Preferences", 14, 15);
  const admissionNo=localStorage.getItem('admissionNo');
  // we define the name of our PDF file.
  doc.save(`branchChangeRequest_${admissionNo}.pdf`);
};

export const generateStudentPDF = detail => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Admission No.", "OfferedCourse", "OfferedBranch", "OfferedDepartment","PreviousCourse","PreviousBranch","PreviousDepartment"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
    const studentData = [
      detail.admn_no,
      //courseValueToNameMapping[getKeyByValue(courseValueToIdMapping,application.branchChangeApplication.course_id)],
      //application.branchDetails.name,
      //application.departmentDetails.name
      detail.offeredCourse,
      detail.offeredBranch,
      detail.offeredDepartment,
      detail.previousCourse.name,
      detail.previousBranch.name,
      detail.previousDepartment.name
    ];
    // push each tickcet's info into a row
    tableRows.push(studentData);


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // ticket title. and margin-top + margin-left
  doc.text("Student Result", 14, 15);
  const admissionNo=detail.admn_no;
  // we define the name of our PDF file.
  doc.save(`studentDetail_${admissionNo}.pdf`);
};

