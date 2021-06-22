import React, { useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    Link 
  } from "@material-ui/core";
  import Grid from '@material-ui/core/Grid';


const tokenglobal = localStorage.getItem('token')

const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#ffffff",
    },
    logo: {
      fontFamily: "Cinzel",
      fontWeight: 600,
      fontSize: 35,
      color: "#ff8800",
      textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 800,
        fontSize: 15,
        marginTop: 12,
        
     },
  }));


function Navbar(){
      
    const { header, logo, menuButton } = useStyles();

    


    const displayDesktop = () => {
        return (
            <Toolbar>
            <Grid
              justify="space-between" 
              container 
              spacing={24}
              >
          <Grid item xs={8}>
            <Typography type="title" color="inherit">
            {GOTLogo}
            </Typography>
            </Grid>
            
          <Grid item xs={1}>
            <Button className={menuButton} style={{borderRadius: 20}}  href='/' >Home </Button>
            </Grid>
            <Grid item xs={1}>
            <Button className={menuButton} style={{borderRadius: 20}} href='/login' >Login </Button>
            </Grid>
            <Grid item xs={1}>
            <Button className={menuButton} style={{borderRadius: 20}} href='/registration'>Register</Button>
            </Grid>
            <Grid item xs={1}>
            <Button className={menuButton} style={{borderRadius: 20}}>About</Button>
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
      <AppBar  className={header}>{displayDesktop()}</AppBar>
    </header>
    )

}



export default Navbar