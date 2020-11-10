import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {API} from '../../config'
import Session from 'react-session-api'
import axios from "axios"
import {Redirect} from 'react-router';

//style for the popup
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

//Logout function allows the user to logout of the platform and redirects to the home page

export default function Logout(){
    const classes = useStyles();
    //anchorEl state specifies if the popup should be open or closed
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const logoutSession=()=>{
        Session.set('token',localStorage.getItem('token'));
        axios({
            method: 'post',
            url: `${API}/users/logout`,
            headers: {
              Accepts:'application/json',
              "Content-Type":"application/json",
              Authorization: 'Bearer '+Session.get('token')
             },
          })
          .then(response=>{
              if (response.status===200){
                console.log(response);
                return (<Redirect to="/" />);    
              }
              else alert('We could not log you out due to some internal error!');
          })
          .catch(error => alert(error))
    
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        <a href="#" aria-describedby={id} onClick={handleClick}><i class="fa fa-user-circle fa-3x" /></a>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography className={classes.typography}><a href="#" onClick={logoutSession}><i class='fas fa-sign-out-alt fa-fw fa-2x' aria-hidden='true'></i> Logout</a></Typography>
        </Popover>
      </div>
    );
  }
  