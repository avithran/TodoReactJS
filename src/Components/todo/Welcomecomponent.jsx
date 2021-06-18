import React,{Component} from 'react';
import './bootstrap.min.css';
import Helloworldservice from '../../api/todo/Helloworldservice.js';

class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            welcomeMessage:''
        }
        this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessMessage=this.handleSuccessMessage.bind(this);
        this.handleErrorMessage=this.handleErrorMessage.bind(this);

    }
    render(){
        return(
            <>
            <div>
                Welcome {/*this.props.match.params.name*/sessionStorage.getItem('AuthenticatedUser')}!
            </div>
             <div>
                Get Some Random Message
                <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Display Message</button>
             </div>
             <div className="container">
               {this.state.welcomeMessage}
            </div>
         </>
        );
    }
    retrieveWelcomeMessage(){
        // Helloworldservice.executeHelloworldservice()
        // .then(resp=>this.handleSuccessMessage(resp))

        // Helloworldservice.executeHelloworldbeanservice()
        // .then(resp=>this.handleSuccessMessage(resp))

        Helloworldservice.executeHelloworldpathvariableservice(sessionStorage.getItem('AuthenticatedUser'))
        .then(resp=>this.handleSuccessMessage(resp))
        .catch(err=>this.handleErrorMessage(err))
       
    }

    handleSuccessMessage(response){
        this.setState({
             welcomeMessage:response.data
        })
    }

    handleErrorMessage(err){
       // alert(err.response.data.message+"! "+err.response.data.error)
       console.log(err)
        //  this.setState({
        //       welcomeMessage:err.response.data.error+"|"+err.response.data.message
        //  })
    }
}

export default WelcomeComponent;