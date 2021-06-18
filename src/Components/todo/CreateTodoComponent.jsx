import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import React,{Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import todocomponent from './todocomponent.jsx'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class CreateTodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id: '',
            description:'',
            targetDate:''
        }
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(values){
        let user=sessionStorage.getItem('AuthenticatedUser');
            TodoDataService.createDataService(user,
                {
                    username:user,
                    description:values.description,
                    date: moment(values.targetDate).format('YYYY-MM-DD'),
                    done:false
                }
            )
            toast('New Todo Created') 
            this.props.history.goBack();
            todocomponent.refreshTodo();
            //this.props.history.pop('')
    }

    validate(values){
        let errors={}
        if(!values.description)
        {
            errors.description='Enter a description'
        }
        else if(values.description.length<5)
        {
            errors.description='Enter atleast 5 characters in descriptions'
        }

        if(!moment(values.targetDate).isValid())
        {
            errors.targetDate='Enter a valid date'
        }
        return errors;
    }

    
    render(){
        let {description,targetDate} = this.state
      
        return(
        <div>
           <h1>Create Todo</h1>
           <div className="container">
               <Formik
              initialValues={{description,targetDate}}
               onSubmit={this.onSubmit}
               validate={this.validate}
               >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="id"component="div" className="alert alert-warning"/>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control"  type="text" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control"  type="text" name="targetDate"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Create</button>
                            </Form>
                        )
                    }
               </Formik>
           </div>
        </div>
        )
    }
}

export default CreateTodoComponent