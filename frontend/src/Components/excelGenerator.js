//a javascript file to generate excel files
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

/* csv data and filename is taken as input, and an excel file containing all the data is generated and saved using FileSaver,
which is further downloaded on the system of the user */
const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export default exportToCSV;