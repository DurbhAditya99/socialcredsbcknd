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
    headers: {
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


function Footer(){
      
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
    
 

<div class="footer" style={{ 
  position: 'relative',
  left: 0,
  bottom: 0,
  width: 1500 ,
  height: 30,
  backgroundColor: 'whitesmoke',
  color: '#ff8800',
  textAlign: 'center',
  fontSize: 30
   }}>
  <p>TERMS AND CONDITIONS</p>
</div>
    
    )

}



export default Footer