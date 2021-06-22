import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const images = [
    {
      url: '/static/images/offer.jpg',
      title: 'Offer',
      width: '50%',
    },
    {
      url: '/static/images/request.png.',
      title: 'Request',
      width: '50%',
    },
  ];
  

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '50%',
      },
   
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '200%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		backgroundColor: 'white',
		borderRadius: 30
		
	},
	submit: {
		margin: theme.spacing (3, 0, 2),
	},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));



const token = localStorage.getItem('token')
const userID = localStorage.getItem('userID')

// Registration Part

export default function CreatePost() {

	const [state, setState] = React.useState({
		checkedA: true
	  });

	const history = useHistory();
	const initialFormData = Object.freeze({
        service_type : '',
        title : "",
        description : "",
        checkedA  :  '',
        start_date  : "",
        end_date : "",
        est_hours : "",
        vol_req : "",
        category: ''
	});



	const [formData, updateFormData] = useState(initialFormData);
//	const [formErrors, updateFormErrors] = useState(iformErrors);
//	const [errors,setErrors] = useState('')

/*	const formValid = (formError) => {
		let valid = true;
		console.log('fomrerror',formError)
		Object.values(formError).forEach( val=> {
			val.length >0 && (valid=false);
			})
		return valid;
}
*/
	

	const handleChange = (e) => {

		const { name , value } = e.target
        setState({ ...state, [e.target.name]: e.target.checked });
		
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
		
		console.log(name ,value)
	};



	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData)
		
		fetch('http://127.0.0.1:8000/api/create/',{
			method:"POST",
			headers: {
				"Content-Type": 'application/json',		
                "Authorization" : `Token ${token}`						
			},
			body: JSON.stringify({
                service_type : formData.service_type,
                title : formData.title,
                description : formData.description,
                act_status  : formData.act_status,
                start_date  :  formData.start_date,
                end_date : formData.end_date,
                est_hours : formData.est_hours,
                vol_req : formData.vol_req,
				is_active : formData.checkedA,
			}),

		})
		.then(function(res){   
			res.json().then(function(data) {	
				console.log('printing data',data)
                
				}) 
        })
		.catch(error => {
            console.log('There was an error!', error);
        });
        console.log('There was an error!')
        history.push('/dashboard')
	}
	
	

	const classes = useStyles();

	return (

		<div class = 'register'>
		
		
		<Container component="main" maxWidth="xs">
		
			<CssBaseline />    
             
       
			
			<div className={classes.paper}>

				<Typography component="h1">
                    Register your program! 
				</Typography>

				<form className={classes.form} noValidate>
					<Grid container spacing={2} style={{marginLeft: 20, marginRight: 20}}>
					<Grid item xs={12}>
					<FormControlLabel
					control ={
					<Switch
      				checked={state.checkedA}
					value={state.checkedA}
       				onChange={handleChange}
       				name="checkedA"
       				 inputProps={{ 'aria-label': 'secondary checkbox' }}
					color ='primary'
     				 />
					}
					label ="Status(currently is active)"
					/>
					</Grid>
                    <Grid item xs={3}>
                    <InputLabel id="demo-simple-select-label">Service Type: </InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="service_type"
                    name= 'service_type'
                     onChange={handleChange}
                     >
                    <MenuItem value={"O"}>Offer</MenuItem>
                    <MenuItem value={"R"}>Request</MenuItem>
                   
                    </Select>
                    </Grid>
                    <Grid item xs={3}>
                    <InputLabel id="demo-simple-select-label">Category:  </InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="category"
                    name= 'category'
                     onChange={handleChange}
                     >
                    <MenuItem value={"E"}>Earth Creds</MenuItem>
                    <MenuItem value={"R"}></MenuItem>
                   
                    </Select>
                    </Grid>
					<Grid item xs={8}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="title"
								label= "Title of the program"
								type="title"
								id="title"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={10}> 
							<TextField
								variant="outlined"
								required
								fullWidth
                                multiline
								name="description"
								label= "Brief Description of the program"
								type="description"
								id="description"
								onChange={handleChange}
							/>

						</Grid>
						
						<Grid item xs={12}>
           				 <TextField
            			id="start_date"
           				 name='start_date'
            			label="Start Date"
            			type="date"
          				 onChange={handleChange}
         			 	 className={classes.textField}
           				InputLabelProps={{
            			 shrink: true,
         					 }}
         
              				/>
							  
                              <TextField
            			id="end_date"
           				 name='end_date'
            			label="End Date"
            			type="date"
          				 onChange={handleChange}
         			 	 className={classes.textField}
           				InputLabelProps={{
            			 shrink: true,
         					 }}
         
              				/>
                        
						
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required	
								id="est_hours"
								label="Estimated hours"
								name="est_hours"
								type= 'number'
								onChange={handleChange}
							/>
                            
							<TextField
								variant="outlined"
								required
								name="vol_req"
								label="Volunteers required: "
								type="number"
								id="vol_req"
								onChange={handleChange}
							/>
						</Grid>
						
					
					
                        </Grid>
					<Button
						type="submit"
						style={{marginLeft: 20}}
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick = {handleSubmit}
					>
					    Create Post!
					</Button>
				</form>
			</div>
		</Container>
		</div>
	);
}


