import React,{Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js'
import moment from 'moment'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


class todocomponent extends Component{
    constructor(props){
        super(props);
        this.state={
            todos:[

              ],
              message:null
        }
        this.deleteTodo= this.deleteTodo.bind(this);
        this.updateTodo= this.updateTodo.bind(this);
        this.createTodo= this.createTodo.bind(this);
        this.refreshTodo= this.refreshTodo.bind(this);
    }

    componentDidMount(){
       this.refreshTodo();
    }

    render(){
        return(
            <div>
                <h1>TODO LIST</h1>
                
                {/* {this.state.message&&<div className="alert alert-success">{this.state.message}</div>} */}
                <div className="container-fluid todowrapper">
                <button className="btn-sm btn-success" onClick={this.createTodo}>Add</button>
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>DESCRIPTION</th>
                            <th>COMPLETED</th>
                            <th>DATE COMPLETED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                            todo=>
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString().toUpperCase()}</td>
                                <td>{todo.date!=null&& moment((todo.date)).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodo(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodo(todo.id)}>Delete</button></td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

    refreshTodo(){
        let user =sessionStorage.getItem('AuthenticatedUser');
        //console.log('user: '+user)
        TodoDataService.retriveDataService(user)
        .then(
            response=>this.setState({todos:response.data})
            //response=> console.log(response)
            )
    }

    deleteTodo(id){ 
        //console.log('id: '+id)
        TodoDataService.deleteDataService(sessionStorage.getItem('AuthenticatedUser'),id)
        .then(response=>{
            toast.error(`Todo ${id} has deleted.`);
           this.refreshTodo()
            }
            )
        .catch(resp=>
            toast.error(`ERROR: ${resp.message}`,{position:toast.POSITION.BOTTOM_CENTER})
        )
    }

    updateTodo(id){ 
        //let username = sessionStorage.getItem('AuthenticatedUser');
       this.props.history.push(`/TodoApp/todos/${id}`);
       this.refreshTodo();
    }
    createTodo(){
        this.props.history.push('/TodoApp/todos/create');
        this.refreshTodo();
    }

}

export default todocomponent;