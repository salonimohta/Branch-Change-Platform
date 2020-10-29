import React from 'react';
import './index.css';

export default class BranchChangeResult extends React.Component{
    render(){
        return(
            <div>
                <button type="submit" className="btn btn-primary downloadResultButton">Download</button>
                <br/><br/>
                <div className="resultTable">
                <table class="table table-striped">
                      <thead>
                        <tr>
                            <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Admission No</th>
                          <th scope="col">Department</th>
                          <th scope="col">Course</th>
                          <th scope="col">Preference Offered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>abc</td>
                          <td>19je0001</td>
                          <td>CSE</td>
                          <td>BTech</td>
                          <td>0</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>def</td>
                          <td>19je0002</td>
                          <td>ECE</td>
                          <td>BTech</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                </div>
            </div>
        )
    }
}