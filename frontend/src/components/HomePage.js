import React from 'react'
import {BrowserRouter as Router,Route,Switch, Link, Redirect} from 'react-router-dom'
import LoginPage from './login'
import SignUp from './registration'
import LandingPage from './landingpage'
import ProfilePage from './profile'
import Dashboard from './dashboard'
import CreatePost from './create'
import ProfileUpdatePage from './profileupdate'
import ActDetail from './actdetail'



function HomePage(){

    return(
    
       
        <Router>
        <Switch>
            <Route exact path = '/' component={LandingPage} />
            <div style={{
            marginTop: 80, marginBottom: 80
        }}>
            <Route exact path = '/profile' component={ProfilePage} />
            <Route path = '/profile/edit' component={ProfileUpdatePage} />
            <Route exact path = '/create' component={CreatePost} />
            <Route path = '/login' component={LoginPage} />
            <Route path = '/registration' component={SignUp} />
            <Route path = '/actdetail/:id' render={(props) => <ActDetail {...props} /> } />
            <Route path = '/dashboard' component={Dashboard} />
            </div>
            </Switch>
         </Router>
         
    )

}


export default HomePage