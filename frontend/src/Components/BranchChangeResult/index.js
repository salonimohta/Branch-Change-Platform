import React from 'react';
import './index.css';
import {generateStudentPDF} from './../viewRequestPDFGenerator';
import exportToCSV from './../excelGenerator';

export default class BranchChangeResult extends React.Component{
  constructor(props){
    super(props);
    this.state={
      csvData: []
    };
  }
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