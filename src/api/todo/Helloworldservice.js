import axios from "axios";

class Helloworldservice{
 executeHelloworldservice(){
     //console.log('service executed');
     return axios.get('http://localhost:8080/helloworld');
 }

 executeHelloworldbeanservice(){
    //console.log('service executed');
    return axios.get('http://localhost:8080/helloworldbean');
}

executeHelloworldpathvariableservice(name){
    //console.log('service executed');
    return axios.get(`http://localhost:8080/helloworldbean/path/${name}`);
}
}

export default new Helloworldservice();