import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'
//import WelcomeComponent from './Welcomecomponent.jsx'
class HeaderComponent extends Component{

    render(){
        const isUserLoggedIn = AuthenticationService.isUserloggedIn();
        return(
            <header>  
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div><a className="navbar-brand" href="/TodoApp/login">BAVITHRAN</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn&&<li ><Link to="/TodoApp/home" className="nav-link">HOME</Link></li>}
                       { isUserLoggedIn&&<li ><Link to="/TodoApp/todo" className="nav-link">TODO</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                       { !isUserLoggedIn&&<li><Link to="/TodoApp/login" className="nav-link">LOGIN</Link></li>}
                       { isUserLoggedIn&&<li  className="nav-link">Welcome {sessionStorage.getItem('AuthenticatedUser').toUpperCase()}!</li>}
                        {isUserLoggedIn&&<li><Link to="/TodoApp/login" className="nav-link" onClick={AuthenticationService.logout}>LOGOUT</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }
    }

    export default withRouter(HeaderComponent);