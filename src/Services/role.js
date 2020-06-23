export default function Role() {
    const user = JSON.parse(localStorage.getItem('login'));
     if (user && user.accessToken) {
         const jwtDecode = require('jwt-decode');
    const token =  user.accessToken;
    const decoded = jwtDecode(token);
    const token1 =  user.refreshToken;
    const decoded1 = jwtDecode(token1);

        return decoded  } else {
        return {};
      } 
  }