import React from 'react';
import axios from 'axios';


const getToken=()=>{
  return localStorage.getItem('token');
}

export const getUserList=(authRequest)=>{
  return axios({
      method:'GET',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/user`,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}

export const addUser=(user)=>{
  return axios({
      method:'POST',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/signup`,
      'data':user,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}

