import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://82.179.9.51:8080/";

class UserService {

    
    getAttachedUserList() {
                return axios.get(API_URL+"doctor/attached-patients", { headers: authHeader() })
                   }
    getAllUserList() {
                return axios.get(API_URL+"doctor/patients", { headers: authHeader() })
                    }
    postStepHistory(id) {
                return axios.post(API_URL+"doctor/step_history", {id},{ headers: authHeader() })
                    }
    postPulseHistory(id) {
                return axios.post(API_URL+"doctor/pulse_history",{id}, { headers: authHeader() })
                }   
    postPressureHistory(id) {
                return axios.post(API_URL+"doctor/pressure_history",{id}, { headers: authHeader() })
                }   
    postAddRecommendation(patient_id,end_date,time_reminder,content){
                  return axios.post(API_URL + "doctor/add-recommendation",{patient_id,end_date,time_reminder,content},{headers: authHeader()} ); 
    }
    postInfoRecommendation(id){
        return axios.post(API_URL+"doctor/info-recommendation",{id}, { headers: authHeader() }) 
    }
    postAddTreatmentInformation(end_date,patient_id,content){
        return axios.post(API_URL+"doctor/add-treatment-information",{end_date,patient_id,content}, { headers: authHeader() })     
    }
    postInfoInfoTreatmentInformation(id){
        return axios.post(API_URL+"doctor/info-treatment-information",{id}, { headers: authHeader() }) 
    }
    postIndicators(id){
          return axios.post(API_URL + "patient/confirm-recommendation",{id},{headers: authHeader()} ); 
    }
    postInfo(id){
        return axios.post(API_URL + "patient/confirm-recommendation",{id},{headers: authHeader()} ); 
  }
    getDocName() {
        return axios.get(API_URL+"doctor/name",{}, { headers: authHeader() })
              }
}

export default new UserService();