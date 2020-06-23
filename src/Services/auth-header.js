import axios from "axios";
export default function authHeader() {
  
    const user = JSON.parse(localStorage.getItem('login'));
   
    if (user && user.refreshToken){
    const jwtDecode = require('jwt-decode');
    const token =  user.accessToken;
    const decoded = jwtDecode(token);
    if(decoded.exp > new Date().getTime() / 1000){
      return { Authorization: 'Bearer ' + user.accessToken };
    }
    else{
      const refreshToken = user.refreshToken;
      axios.post('http://82.179.9.51:8080/refresh', {refreshToken})
            .then(res => {
            // console.log(res);
            localStorage.removeItem('login');
            localStorage.setItem("login", JSON.stringify(res.data));
            const user1 = JSON.parse(localStorage.getItem('login'));
            window.location.reload();
            return { Authorization: 'Bearer ' + user1.accessToken };
    }).catch(err => {
      if(err.response.data.message === "Token expired!"){
        window.location.reload();
        return localStorage.clear();
        
      }
    })}
      
    } else {
     
      return localStorage.clear();
    }
    
  }
  