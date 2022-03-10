
import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('token');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/login`,
        'data':authRequest
    })
}

export const getUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/userinfo`,
        headers:{  
            'Authorization':'Bearer '+getToken()
        }
    })
}

