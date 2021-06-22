import React, { useEffect } from 'react'
import {useState} from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

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

function ActDetail(props){
    
  const [act,setAct] = useState({})
  const classes = useStyles();
  const {id} = props.match.params
  const [users,setUsers] = useState()

  const addUser =() =>{
 
    fetch(`http://127.0.0.1:8000/api/detail/${id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Token ${token}`								
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data['user'])
      } )

  }

  
  
  useEffect(() =>{
        
    fetch(`http://127.0.0.1:8000/api/detail/${id}`,{
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "Authorization" : `Token ${token}`								
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setAct(data)
      } )
    }, [])

   
  
  return(

         	  <div style={{display:'block'}}>
           
            <Card variant='outlined'  style={{width:1000 , marginTop: 100, marginLeft: 200 }}>
               <CardContent style={{}}>
               <Grid container spacing={3}  >
            <Grid item xs={24}>
            <Typography component='h1' style={{textAlign: 'center', fontSize: 40 , fontFamily: 'Cinzel'}}> 
            {act['title']}
            </Typography>
            </Grid> 
            <Grid item xs={12}>
            <TextField
            name='Description'
            defaultValue = 'None'
            value = {act['description']}
            variant= 'outlined'
            label='Description'
            multiline
            style={{width: 800}}
            >
            </TextField>
            </Grid> 
            <Grid item xs={2}>
            <TextField
            name='service'
            defaultValue = 'None'
            value = {act['service_type']}
            variant= 'outlined'
            label='Service Type: '
            >
            </TextField>
            </Grid> 
            <Grid item xs={2}>
            <TextField
            name='Description'
            defaultValue = 'None'
            value = {act['start_date']}
            variant= 'outlined'
            label='Start Date: '
            >
            </TextField>
            </Grid> 
            <Grid item xs={2}>
            <TextField
            name='Description'
            defaultValue = 'None'
            value = {act['end_date']}
            variant= 'outlined'
            label='Expiry Date: '          
            >
            </TextField>
            </Grid> 
            <Grid item xs={3}>
            <TextField
            name='Description'
            defaultValue = 'None'
            value = {act['category']}
            variant= 'outlined'
            label='Category: '          
            >
            </TextField>
            </Grid>
            <Grid item xs={3}>
            <TextField
            name='vol_req'
            defaultValue = 'None'
            value = {act['vol_req']}
            variant= 'outlined'
            label='Volunteers Required: '          
            >
            </TextField>
            </Grid>
            <Grid item xs={3}>
            <TextField
            name='current'
            defaultValue = 'None'
            value = {act['user']}
            variant= 'outlined'
            label='Current number of volunteers'          
            >
            </TextField>
            </Grid>
            <Grid item xs= {12}>
            <Button onClick={addUser} style={{position: 'relative'}}>I want to join</Button>  
            </Grid> 
            <Grid item xs= {12}>
            <Typography>{users}</Typography>  
            </Grid> 
            </Grid>
            </CardContent>
            </Card>
          
            </div>

   
      
        
       )  


}



export default ActDetail