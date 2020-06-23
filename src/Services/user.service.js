import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://82.179.9.51:8080/";

class UserService {

    getUserBoard() {
        return axios.get(API_URL+"patient/info", { headers: authHeader() })
              }
  

    getUserList() {
                return axios.get(API_URL+"admin/users", { headers: authHeader() })
                      }
    getAttachedUserList() {
                return axios.get(API_URL+"doctor/attached-patients", { headers: authHeader() })
                   }
    getStepHistory() {
                return axios.get(API_URL+"step_history", { headers: authHeader() })
                    }
    getPulseHistory() {
                return axios.get(API_URL+"pulse_history", { headers: authHeader() })
                }   
    getPressureHistory() {
                return axios.get(API_URL+"pressure_history", { headers: authHeader() })
                }   
    postRecommendation(start_date,end_date){
                  return axios.post(API_URL + "patient/info-recommendation",{start_date,end_date},{headers: authHeader()} ); 
    }
    postDellRecommendation(rec_id){
          return axios.post(API_URL + "patient/confirm-recommendation",{rec_id},{headers: authHeader()} ); 
    }
    getUserInfoTI() {
        return axios.post(API_URL+"patient/info-treatment-information",{}, { headers: authHeader() })
              }
}

export default new UserService();