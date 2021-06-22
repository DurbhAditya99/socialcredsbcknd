import React, { useEffect } from 'react'
import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});




const token = localStorage.getItem('token')
const userID = localStorage.getItem('userID')

function  ProfilePage(){
    
  const [user,setUser] = useState({})
  const [acts,setAct] = useState([])
  const classes = useStyles();

    useEffect(() =>{
 //   const userID =this.props.match.params.userID;
    fetch(`http://127.0.0.1:8000/api/user/profile/${userID}`,{
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Token ${token}`								
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUser(data)
        
      } )

      fetch(`http://127.0.0.1:8000/api/user/act`,{
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Token ${token}`								
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)       
          setAct(data) 
        } )
    
    
    }, [])
    
  
   
  
  return(
     
        <div class='profile'>
          <div class= 'edit'>
            <Button href='/profile/edit' style={{right:240}}><EditIcon /></Button>
          </div>
         <div class='details'>
      
       

             <Card variant='outlined' style={{width:1000 , marginTop: 100, marginLeft: 200 }}>
            
              <h1 style={{fontFamily:'Fredoka One', textAlign:'center'}}>My Profile</h1> 
              
        <CardMedia
          className={classes.media}
          image="/static/images/profile.jpeg"
          title="Contemplative Reptile"
          style={{width: 275, marginLeft: 355, borderRadius: 180, height: 275 }}
          
        />
        
  
               <CardContent style={{}}>
          
               <Grid container spacing={3} >
            <Grid item xs={3}>
              <TextField label='First Name' variant='outlined' defaultValue='nONE' value={user['first_name']} id='read-only'> </TextField> 
             </Grid>
             <Grid item xs={3}>
             <TextField label='Last Name' defaultValue='nONE' variant='outlined' value={user['last_name']} id='read-only' multiline> </TextField> 
             
             </Grid>
             <Grid item xs={3}>
             <TextField label='Mobile Number' defaultValue='nONE' variant='outlined' value={user['mobile_number']} id='read-only'> </TextField>
            
             </Grid>
             <Grid item xs={3}>
             <TextField label='Date of birth:' id='date' defaultValue='nONE' variant='outlined' value={user['dob']} id='read-only'> </TextField>
             </Grid>
             <Grid item xs={4}>
             <TextField label='Email ID: ' defaultValue='nONE' variant='outlined' value={user['email_id']}id='read-only' style={{width: 300 , fontSize: 100}}> </TextField>
            
             </Grid>
             <Grid item xs={3}>
             <TextField label='Credit Balance: ' defaultValue='nONE' variant='outlined' value={user['account_balance']} id='read-only'> </TextField>
            
              </Grid>
              <Grid item xs={12}>
              <TextField label='About Me:' multiline defaultValue='nONE' variant='outlined' value={user['about']} id='read-only'  style={{width: 800 }}> </TextField>
              </Grid>
              </Grid>
              </CardContent>
              </Card>

            
  
  
            </div>
          
    
    </div>
   
      
        
       )  


}



export default ProfilePage