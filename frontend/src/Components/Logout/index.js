import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {API} from '../../config'
import Session from 'react-session-api'
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function Logout() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const logoutSession=()=>{
        axios({
            method: 'post',
            url: `${API}/users/logout`,
            headers: {
              Accepts:'application/json',
              "Content-Type":"application/json",
              Authentication: 'Bearer '+Session.get('token')
             },
            data: {
               username: this.state.username
              }
          })
          .then(response=>{
              if (response.status===200){
                  Session.clear();
                  localStorage.clear();
                  this.props.history.push('/');
                  this.props.history[0]=this.props.history[this.props.history.length-1];
                  this.props.history.length=1;
              }
              else alert('We could not log you out due to some internal error!');
          })
    
    }
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        {/*<a aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>*/}
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
  