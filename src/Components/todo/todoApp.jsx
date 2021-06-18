import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './style.css';
import './bootstrap.min.css';
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from './LoginComponent'
import todocomponent from './todocomponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import WelcomeComponent from './Welcomecomponent'
import UpdateTodoComponent from './UpdateTodoComponent.jsx'
import CreateTodoComponent from './CreateTodoComponent.jsx'
import HomeComponent from './HomeComponent.jsx'
class todoApp extends Component{
    render(){
        return(
            
                <Router>
                <HeaderComponent/>
                    <>
                    <Switch>
                    <Route  path="/TodoApp" exact component={LoginComponent}/>
                    <Route path="/TodoApp/login" component={LoginComponent}/>
                    <AuthenticatedRoute path="/TodoApp/home" component={HomeComponent}/>
                    <AuthenticatedRoute path="/TodoApp/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/TodoApp/todos/create" component={CreateTodoComponent}/>
                    <AuthenticatedRoute path="/TodoApp/todos/:id" component={UpdateTodoComponent}/>    
                    <AuthenticatedRoute path="/TodoApp/todo" component={todocomponent}/>
                    <AuthenticatedRoute path="/TodoApp/logout" component={LogoutComponent}/>
                    <Route component={errorComponent}/>
                    </Switch>
                    </>
                    <FooterComponent/>
                </Router>
               
           
        );
    }
}

function errorComponent(props){
    return(
    <div>An Error Occured!.Please contact help desk!</div>)
}

export default todoApp;