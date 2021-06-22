import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Calendar from 'react-calendar';



const token = localStorage.getItem('token')
const fn = localStorage.getItem('first_name')

class Dashboard extends Component{

    constructor() {
        super();
        this.state ={data: []};
    }

    async componentDidMount(){
        const response = await fetch(`http://127.0.0.1:8000/api/display/all`,{
             method: 'GET',
             headers: {
               "Content-Type": 'application/json',
               "Authorization" : `Token ${token}`								
             }
           })
        const json = await response.json();
        this.setState({ data: json});
        console.log(this.state.data)
    }

    changeURL = (id) =>{
        console.log(id)
        window.location.href=`/actdetail/${id}`
    }


    render() {  
    return(      
                  <div>
                    <h1 style={{textAlign:'center', fontSize: 80, fontFamily: 'Cinzel', color: '#ff8800', backgroundColor: 'ff'}}>Welcome {fn}</h1>
                    <Card style={{wordSpacing: 4,textAlign: 'center ',position: 'absolute',top:190, width:1500, fontFamily: 'Fredoka One',height: 25}}> Your Credit balance: Total Clocked hours: </Card>
                
                <div class='dash'>
                 <h1 style={{}}>Current Programs </h1>
               <Grid container spacing={5}>
                
              {this.state.data.map((info)=>{
                
                return(
                
                 <Grid item xs={4}>
                <div class='card'>
               <Card variant='outlined' style={{borderRadius:10 , marginLeft: 20, marginRight: 20,outlineColor: 'black'}} >
               <CardContent style={{ backgroundColor: 'cornsilk'}}>
               <Typography component='h1'style={{fontSize: 20}}>
               {info.title}
               </Typography>
               <br></br>
               <Typography component='h5' style={{color: 'orange'}}>
                Service type: {info.service_type == 'O'? 'Offer': 'Request' } 
               </Typography>
               <Typography component='h5'  style={{color: 'orange'}}>
               {info.act_status}
               </Typography>
               <Typography component='h3' style={{color: 'orange'}}>
                Start Date: {info.start_date} 
               </Typography>
               <Typography component='h3'  style={{color: 'orange'}}>
                Volunteers Required: {info.vol_req} 
               </Typography>
               <Button onClick={()=>{this.changeURL(info.id)}}><Typography  >See more</Typography></Button>
               </CardContent>
               </Card>
               </div>
               </Grid>

                )
              })}
              </Grid>
         

                </div>
             
              </div>
      

    )
}
}


export default Dashboard;