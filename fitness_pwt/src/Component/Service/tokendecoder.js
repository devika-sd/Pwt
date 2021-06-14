import jwt_decode from 'jwt-decode';

const currentUser = () => {
    var token = localStorage.getItem('token');
    if(token)
    {
       let temp1=jwt_decode(token);
       return temp1._id;
    }
    else
    {
        return "";
    }
 }

const currentRole = () => {
    var token = localStorage.getItem('token');
    if(token)
    {
       let temp1=jwt_decode(token);
       return temp1.role
    }
    else
    {
        return '';
    }
 }

 export default {currentUser , currentRole};