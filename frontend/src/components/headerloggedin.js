import React, { useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    Link 
  } from "@material-ui/core";
  import { useHistory } from 'react-router-dom';
  import Grid from '@material-ui/core/Grid';
  import IconButton from '@material-ui/core/IconButton';
  import AccountCircle from '@material-ui/icons/AccountCircle';

const tokenglobal = localStorage.getItem('token')

const useStyles = makeStyles(() => ({
    header: {
      position: 'fixed',
      top: 0,
      backgroundColor: "#ffffff",
     
    },
    logo: {
      fontFamily: "Cinzel",
      fontWeight: 600,
      fontSize: 30,
      color: "#ff8800",
      textAlign: "left",
      marginTop: 6
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "40px",
        textAlign: 'right',
        marginTop: 18,
        borderRadius: 20
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
  }));

const logout =()=>{
  localStorage.clear()
  window.location.href= '/'
}





function NavbarL(){
      
    const { header, logo, menuButton } = useStyles();
    const history = useHistory();
    
  const logout =() =>{
    localStorage.clear()
    window.location.href = '/';
  }

    const displayDesktop = () => {
        return (
          <Toolbar>
          <Grid
            justify="space-between" 
            container 
            spacing={20}
            >
        <Grid item xs={6}>
          <Typography type="title" color="inherit">
          {GOTLogo}
          </Typography>
          </Grid>
          
          <Grid item xs={0.5}>
          <Button className={menuButton} href='/create'>Post an Activity</Button>
          </Grid>
          <Grid item xs={0.5}>
          <Button className={menuButton} href='/dashboard'>Dashboard</Button>
          </Grid>
          <Grid item xs={0.5}>
          <Button className={menuButton}>About</Button>
          </Grid>
          <Grid item xs={0.5}>
            <IconButton className={menuButton}
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="black"
              href='/profile' 
              style={{color: 'black', position: 'absolute', right: 150, bottom: 1}}
              
            >
              <AccountCircle ></AccountCircle>
            </IconButton>
          </Grid>
          <Grid item xs={1}>
          <Button className={menuButton} href='/' onClick={logout} >Logout </Button>
          </Grid>
          </Grid>
          </Toolbar> ); 
      };

      
  const GOTLogo = (
    <Typography variant="h6" component="h1" className={logo} >
      
             Gift of Time
       
    </Typography>
  );


    return(
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
    )

}



export default NavbarL