import React from 'react';
import './index.css';
import {generateStudentPDF} from './../viewRequestPDFGenerator';
import exportToCSV from './../excelGenerator';


/* This component is used in the AdminHome page under the Download Result tab, the api response of the results is passed as props here */
export default class BranchChangeResult extends React.Component{
  constructor(props){
    super(props);
    this.state={
      csvData: []
    };
  }
  /* With change in props passed to the component, BranchChangeResult component updates it's state which is a temporary storage 
  for the csv data to be downloaded when the download button is selected */
  componentDidUpdate(prevProps){
    if (this.props.results!==prevProps.results){
    let csvdata=[];
    if (this.props.results.length>0){
        this.props.results.map(result=>{
          csvdata.push({Admission_No: result.admn_no,offeredCourse: result.offeredCourse, offeredBranch: result.offeredBranch, offeredDepartment: result.offeredDepartment, previousCourse: result.previousCourse.name, previousBranch: result.previousBranch.name, previousDept: result.previousDepartment.name });

        })
    }
    this.setState({csvData:csvdata});
  }
  }  
  render(){
        return(
            <div>
                <button type="submit" className="btn btn-primary downloadResultButton" onClick={()=>exportToCSV(this.state.csvData,"branchChangeResults2020")}>Download</button>
                <br/><br/>
                <div className="resultTable">
                <table class="table table-striped">
                      <thead>
                        <tr>
                            <th scope="col">#</th>
                          <th scope="col">Admission No</th>
                          <th scope="col">Offered Course</th>
                          <th scope="col">Offered Branch</th>
                          <th scope="col">Offered Dept</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* The detail button here generates a pdf of the details of the student's current and previous branches after branch change */}
                        {this.props.results.map((result,index)=>{
                          return(
                          <tr>
                            <th scope="row">{index+1}</th>
                          <td>{result.admn_no}</td>
                          <td>{result.offeredCourse}</td>
                          <td>{result.offeredBranch}</td>
                          <td>{result.offeredDepartment}</td>
                          <td><button class="btn btn-lg btn-primary" onClick={()=>generateStudentPDF(result)}>Details</button></td>
                          </tr>)
                        })}
                      </tbody>
                    </table>
                </div>
            </div>
        )
    }
}