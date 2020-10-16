import React from 'react';
import './index.css';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';

export default class Footer extends React.Component{
    render(){
        return(
            <div class="bodyFooter">
                All rights reserved
                <CopyrightOutlinedIcon />
                IIT (ISM)
            </div>
        )
    }
}