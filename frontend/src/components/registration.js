import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';



const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '170%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing (3, 0, 2),
	},
}));





// Registration Part

export default function SignUp() {

	const [state, setState] = React.useState({
		checkedA: true
	  });

	const history = useHistory();
	const initialFormData = Object.freeze({
		email_id: '',
		password: '',
		confirm_password: '',
    	dob: " ",
    	first_name: '',
   	 	last_name: '',
   		mobile_number: ''
	});

	const iformErrors = {
		first_name:'',
		last_name:'',
		password: '',
		dob: '',
		confirm_password: '',
		mobile_number: ''
	}

	const [formData, updateFormData] = useState(initialFormData);
	const [formErrors, updateFormErrors] = useState(iformErrors);
	const [errors,setErrors] = useState('')

	const formValid = (formError) => {
		let valid = true;
		console.log('fomrerror',formError)
		Object.values(formError).forEach( val=> {
			val.length >0 && (valid=false);
			})
		return valid;
}

	

	const handleChange = (e) => {
		console.log(state.checkedA)
		const { name , value } = e.target
		setState({ ...state, [e.target.name]: e.target.checked });
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});

	
		let formErr = formErrors;
		switch(name) {
			case 'first_name':
				formErr.first_name = (value.length <3 && value.length >0) ? "Please enter your first name" : "";
				break;
			case 'last_name':
				formErr.last_name = (value.length <3 && value.length >0) ? "Please enter your last name" : "";
				break;
			case 'dob':
				formErr.dob = (value.length == 0) ? "Please enter your Date of birth" : "";
				break;
			case 'password':
				formErr.password= (value.length<6 && value.length > 0) ? "Minimum 6 characters" : "";
				break;
			case 'confirm_password':
				formErr.confirm_password = ( value == (formData.password)) ?  "" : "Both passwords don't match";
				break; 
			case 'mobile_number':
				formErr.mobile_number = (value.length < 10 || value.length > 10 )   ?  "Mobile Number should be 10 digits" : "";
				break; 
		}
		
		updateFormErrors(formErr)
		console.log(formErrors)	
	
	};



	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (formValid(formErrors)){
			console.log('valid!')
			
			if(formData.dob===''){
				console.log('wrong dob')
			}

		


		fetch('http://127.0.0.1:8000/api/user/register/',{
			method:"POST",
			headers: {
				"Content-Type": 'application/json',								
			},
			body: JSON.stringify({
				first_name : formData.first_name,
				last_name: formData.last_name,	
				dob: formData.dob,
				mobile_number: formData.mobile_number,
				email_id: formData.email_id,	
				password: formData.password,
				above_age: state.checkedA,
			}),

		})
		.then(function(res){ 
			if (res.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + res.status);
				return;
			  }

			res.json().then(function(data) {	
				console.log('printing data',data)
				const token = data['token']
				const id = data['id']
				if (token) {
				localStorage.setItem('token' , token)
				localStorage.setItem('userID', id)
				window.location.href = '/dashboard';
				} else {
					
					if(data['dob']){
						const db = data['dob']
						console.log(db[0])
						setErrors('Please enter date of birth')
					}
					if(data['email_id']){
					const em = data['email_id']
					setErrors(em[0])
					localStorage.getItem('token') ? localStorage.removeItem('token') : null
					} 
				}
		})
	})
		.catch(error => {
            console.log('There was an error!', error);
        });
	}else {
		console.log('invalid!')
		setErrors('Form Invalid!')
	}
	}
	
	

	const classes = useStyles();

	return (

		<div class = 'register'>
		
		
		<Container component="main" maxWidth="xs">
		
			<CssBaseline />
			
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					 Summer Program Sign up!	 
				</Typography>
					{errors.length >0 ?<Alert severity='error'> {errors}</Alert>  : null }
				<form className={classes.form} noValidate>
					<Grid container spacing={2} >
					<Grid item xs={12}>
					<FormControlLabel
					control ={
					<Switch
      				checked={state.checkedA}
       				onChange={handleChange}
       				 name="checkedA"
       				 inputProps={{ 'aria-label': 'secondary checkbox' }}
					color ='primary'
     				 />
					}
					label ="Are you above 18?
					 (if below 18 please provide parents' email id and mobile number)"
					/>
						</Grid>	
					<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="first_name"
								label= "First Name"
								type="FirstName"
								id="first_name"
								onChange={handleChange}
							/>
							{formErrors.first_name.length>0 && (
								<span className="errorMessage">{formErrors.first_name}</span>
							)}
						</Grid>
						<Grid item xs={12}> 
							<TextField
								variant="outlined"
								required
								fullWidth
								name="last_name"
								label= "Last Name"
								type="LastName"
								id="LastName"
								onChange={handleChange}
							/>
							{formErrors.last_name.length>0 && (
								<span className="errorMessage">{formErrors.last_name}</span>
							)}
						</Grid>
						
						<Grid item xs={12}>
           				 <TextField
            			id="dob"
           				 name='dob'
            			label="Date of Birth"
            			type="date"
          				 onChange={handleChange}
         			 	 className={classes.textField}
           				InputLabelProps={{
            			 shrink: true,
         					 }}
         
              				/>
							  {formErrors.dob.length>0 && (
								<span className="errorMessage">{formErrors.dob}</span>
							)}
							  
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email_id"
								label="Email Address"
								name="email_id"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password(6 characters minimum)"
								type="password"
								id="password"
								minLength = "6"
								autoComplete="current-password"
								onChange={handleChange}
							/>
							{formErrors.password.length>0 && (
								<span className="errorMessage">{formErrors.password}</span>
							)}
						</Grid>
						<Grid item xs={12}>	
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirm_password"
								label="Confirm Password"
								type="password"
								id="confirm_password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
							{formErrors.confirm_password.length>0 && (
								<span className="errorMessage">{formErrors.confirm_password}</span>
							)}
						</Grid>
      			
        
           
            <Grid item xs={12}> 
							<TextField
								variant="outlined"
								required
								fullWidth
								name="mobile_number"
								label= "Mobile Number(+91): "
								type="MobileNo"
								id="MobileNo"
							
								onChange={handleChange}
							/>
							{formErrors.mobile_number.length>0 && (
								<span className="error">{formErrors.mobile_number}</span>
							)}
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
		</div>
	);
}


