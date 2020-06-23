import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://82.179.9.51:8080";

class AuthService {
    login(login, password) {
        return axios
            .post(API_URL+ "/login", {
                login,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("login", JSON.stringify(response.data));
                    console.log('JSON.stringify(response.data)',JSON.stringify(response.data))
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("login");
      }
      
      register(login,password,email) 
      {
        return axios.post(API_URL + "/doctor/pat-register",{login,password,email},{headers: authHeader()} );
      }
      registerDoc(login,password,email,name,surname,patronymic) 
      {
        return axios.post(API_URL + "/admin/doc-register",{login,password,email,name,surname,patronymic},{headers: authHeader()} );
      }
      reg_info(policy_number,min_pulse,max_pulse,height,weight,min_systolic_pressure,max_systolic_pressure,min_diastolic_pressure,max_diastolic_pressure,user_id) 
      {
        return axios.post(API_URL + "/doctor/patient-edit-profile/info",{
            policy_number,
            min_pulse,
            max_pulse,
            height,
            weight,
            min_systolic_pressure,
            max_systolic_pressure,
            min_diastolic_pressure,
            max_diastolic_pressure,
            user_id},
            {headers: authHeader()} );
      }
      reg_fio(name,surname,patronymic,user_id) 
      {
        return axios.post(API_URL + "/doctor/patient-edit-profile/name",{name,surname,patronymic,user_id},{headers: authHeader()} );
      }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('login'));
        
    }
}


export default new AuthService();