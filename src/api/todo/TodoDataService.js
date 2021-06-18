import axios from 'axios'

class TodoDataService{

    retriveValidationService(username,password){
         let basicAuthHeader= 'Basic '+window.btoa(username+':'+password)
        return axios.get(`https://localhost:8080/login`,
        {
            headers:{
                 authorization:basicAuthHeader
          }
         }
        );
    }

    retriveJWTValidationService(username,password){
       return axios.post(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/authenticate`,{
          username,
          password
        }
       );
   }
    retriveDataService(username){
        //console.log('service executed');
        return axios.get(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/users/${username}/todos`);
    }
    retriveDataServiceForId(username,id){
        //console.log('service executed');
        return axios.get(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/users/${username}/todos/${id}`);
    }

    deleteDataService(username,id){
        //console.log('service executed');
        return axios.delete(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/users/${username}/todo/${id}`);
    }
    updateDataService(username,id,todo){
        //console.log('service executed');
        return axios.put(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/users/${username}/todo/${id}`,todo);
    }

    createDataService(username,todo){
        //console.log('service executed');
        return axios.post(`https://todo-spring-bavi14-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/users/${username}/todos/create`,todo);
    }
   
}

export default new TodoDataService()