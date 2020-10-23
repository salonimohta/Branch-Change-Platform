import React from 'react';
import {Button} from 'react-bootstrap';

class DataRow extends React.Component{
    constructor(){
        super();
    }
    render(){
        const RNo=this.props.number;
        const RName=this.props.name;
        const RDateSubmitted=this.props.dateSubmitted;
        const RStatus=this.props.status;
        return(
            <tr role="row" class={(RNo & 1) ? "odd" : "even"}>
                <td class="">
                    {RNo}
                </td>
                <td>{RName}</td>
                <td class="">{RDateSubmitted}</td>
                <td class="sorting_1">
                    <h5>{RStatus==="pending" ? 
                        <div class="badge badge-pill badge-info badge-shadow"><h6>Pending</h6></div>
                        :
                        <div class="badge badge-pill badge-success badge-shadow"><h6>Approved</h6></div>
                        }
                    </h5>
                </td>
            <td>{RStatus==="approved" ? <button class="btn btn-lg btn-primary disabled" aria-disabled="true" disabled>Approve</button>
            :
            <button class="btn btn-lg btn-primary">Approve</button>
            }
            </td>
            </tr>
        )
    }
}

export default class CheckStatus extends React.Component{
    render(){
        return(
            <div class="card">
                  <div class="card-header">
                    <h4>Status of Branch Change Requests:</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <div id="table-1_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer"><div class="row"><div class="col-sm-12 col-md-6"><div class="dataTables_length" id="table-1_length"><label>Show <select name="table-1_length" aria-controls="table-1" class="form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div></div><div class="col-sm-12 col-md-6"><div id="table-1_filter" class="dataTables_filter"><label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="table-1" /></label></div></div></div><div class="row"><div class="col-sm-12"><table class="table table-striped dataTable no-footer" id="table-1" role="grid" aria-describedby="table-1_info" >
                        <thead>
                          <tr role="row"><th class="text-center sorting" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="
                              #
                            : activate to sort column ascending" style={{width: "24px;"}}>
                              #
                            </th><th class="sorting" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Task Name: activate to sort column ascending" style={{width: "147px;"}}>Task Name</th><th class="sorting" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Due Date: activate to sort column ascending" style={{width: "90px;"}}>Due Date</th><th class="sorting_desc" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style={{width: "108px;"}} aria-sort="descending">Status</th><th class="sorting" tabindex="0" aria-controls="table-1" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{width: "75px;"}}>Action</th></tr>
                        </thead>
                        <tbody>
                        <DataRow number="1" name="abc" dateSubmitted="22/10/2020" status="approved" /> 
                        <DataRow number="2" name="def" dateSubmitted="22/10/2020" status="pending" /> 
                        </tbody>
                      </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="table-1_info" role="status" aria-live="polite">Showing 1 to 10 of 12 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="table-1_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="table-1_previous"><a href="#" aria-controls="table-1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="table-1" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="table-1" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item next" id="table-1_next"><a href="#" aria-controls="table-1" data-dt-idx="3" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                    </div>
                  </div>
                </div>
                
        )
    }
}