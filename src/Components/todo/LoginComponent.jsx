import React,{Component} from 'react';
import AuthenticationService from './AuthenticationService.js'
//import {Redirect} from 'react-router-dom'
import WelcomeComponent from './Welcomecomponent.jsx';
import TodoDataService from '../../api/todo/TodoDataService.js'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class LoginComponent extends Component{
    constructor(props){
        super(props);
      
        this.state={
            username:'',
            password:'',
            hasLoginSucess:false,
            hasLoginFail:false
        }
        
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values){
        //this.props.history.push('/login');
        TodoDataService.retriveJWTValidationService(values.username,values.password)
        .then(
            res=>{
                   // console.log('data[i].username: '+data[i].username)
                  // console.log('TOKEN: '+res.data.token)
                        toast.success('Login Successful!',{position:toast.POSITION.TOP_LEFT,autoClose:1000})
                        AuthenticationService.JWTloginSuccessful(values.username,res.data.token);
                        this.props.history.push(`/TodoApp/welcome/${values.username}`);
                       // isSuccess='true'
            }
        )
        .catch(err=>{
            toast.error('Invalid credentials!',{position:toast.POSITION.TOP_CENTER,autoClose:3000})
           // console.log('ERROR:'+err)
        }
            )
      
    }
    handleChange(event){
        //console.log(event.target.value);
       this.setState(
           {[event.target.name]:event.target.value}
       )
     }
     
    render(){
        const isUserLoggedIn = AuthenticationService.isUserloggedIn();
        if(isUserLoggedIn) return <WelcomeComponent/>
        let {username,password} = this.state
        return(
            <div className="wrapper">
            <div className="form-wrapper overflow-hidden d-flex flex-column">
            <Formik
              initialValues={{username,password}}
               onSubmit={this.handleSubmit}
               validate={this.validate}
               >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="username"component="div" className="alert alert-warning"/>
                                <ErrorMessage name="password" component="div" className="alert alert-warning"/>
                                <label>LOG IN</label>
                                <fieldset className="form-group">
                                    <label>Username</label>
                                    <Field className="form-control"  type="text" name="username"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Password</label>
                                    <Field className="form-control"  type="password" name="password"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Login</button>
                            </Form>
                        )
                    }
               </Formik>
            </div>
           
            </div>
        );
    }
}

export default LoginComponent;