import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import React,{Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

class UpdateTodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            description:'Learn Forms',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(values){
        let user=sessionStorage.getItem('AuthenticatedUser');
    //console.log('alues.description: '+values.description)
    //    console.log('alues.values: '+new Date(values.targetDate))
        TodoDataService.updateDataService(user,this.state.id,
            {
                id:this.state.id,
                username:user,
                description:values.description,
                date: moment(values.targetDate).format('YYYY-MM-DD')
            }
        )
        toast(`Todo ${this.state.id} updated`);
        this.props.history.goBack();
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

componentDidMount(){

    let user=sessionStorage.getItem('AuthenticatedUser');
    TodoDataService.retriveDataServiceForId(user,this.state.id)
    .then(resp=>
        this.setState(
            {
                description:resp.data.description,
                targetDate:moment(resp.data.date).format('YYYY-MM-DD')
            }
        )
        )
}
    render(){
        let {description,targetDate} = this.state
        return(
        <div>
           <h1>Todo</h1>
           <div className="container">
               <Formik
               initialValues={{description,targetDate}}
               onSubmit={this.onSubmit}
               validate={this.validate}
               enableReinitialize={true}
               >
                    {
                        (props)=>(
                            <Form>
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
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
               </Formik>
           </div>
        </div>
        )
    }
}

export default UpdateTodoComponent