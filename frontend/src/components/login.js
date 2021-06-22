import React from 'react'
import {useState} from 'react'
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
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

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
		height:theme.spacing(12),
		width: theme.spacing(12),
		marginTop: theme.spacing(4)
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	  },
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing (3, 0, 2),
	},
}));

function LoginPage(){

    const history = useHistory();
	
    const initialFormData = Object.freeze({
      email_id: '',
      password: '',
    });

	const iformErrors = {
		email_id: '',
		password: ''
	}
    
    const [formData, updateFormData] = useState(initialFormData);
	const [formErrors, updateFormErrors] = useState(iformErrors);
	const [errors,setErrors] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
  
      fetch('http://127.0.0.1:8000/api/user/login/',{
        method:"POST",
        headers: {
          "Content-Type": 'application/json',								
        },
        body: JSON.stringify({
          username: formData.email_id,	
          password: formData.password,  
        }),
  
      })
      .then((res) => res.json()
	  .then(data=> { console.log(data)
					const token = data['token']
					const id = data['id']
					const fn = data['first_name']
					if (token) {
						localStorage.setItem('token' , token)
						localStorage.setItem('userID', id)
						localStorage.setItem('first_name', fn)
						window.location.href = '/dashboard';
						} else {
							const nfe = data['non_field_errors']
							console.log(nfe[0])
							setErrors(nfe[0])
						}
				} ))
      .catch((err) => { 
        console.log(err.message)
        
      })
      
    };

  const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});

		
	};
    
  const classes = useStyles();
    return(
		<div class='login'>
      <Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					 Sign In
				</Typography>
				{errors.length >0 ?<Alert severity='error'> {errors}</Alert>  : null }
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
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
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
          </Grid>
				</form>
			</div>
		</Container>
		</div>
    )

}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage