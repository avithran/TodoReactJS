import axios from "axios";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AuthenticationService{
    loginSuccessful(username,password){
        sessionStorage.setItem('AuthenticatedUser',username);
    //    let basicAuthHeader= 'Basic '+window.btoa(username+':'+password)
       this.setupAxiosInterceptor(username,password);
    }

    JWTloginSuccessful(username,token){
        sessionStorage.setItem('AuthenticatedUser',username);
    //    let basicAuthHeader= 'Basic '+window.btoa(username+':'+password)
       this.setupAxiosInterceptor(this.createJWTToken(token));
    }

    logout(){
        toast.success('Thank you visit again!',{position:toast.POSITION.TOP_CENTER,autoClose:2000});
        sessionStorage.removeItem('AuthenticatedUser');
    }

    isUserloggedIn(){
        let user=sessionStorage.getItem('AuthenticatedUser');
       // console.log('user: '+user);
        if(user==null) return false
        return true;
    }

    setupAxiosInterceptor(token){
         //let basicAuthHeader= 'Basic '+window.btoa(username+':'+password)
        axios.interceptors.request.use(
            (config)=>{
                if(this.isUserloggedIn()){
                    config.headers.authorization=token
                }
                return config
            }
        )
    }
    createJWTToken(token){
        return 'Bearer '+token
    }
}

export default new AuthenticationService();