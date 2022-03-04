import React from 'react';
import axios from 'axios';


const getToken=()=>{
  return localStorage.getItem('token');
}

export const getItemList=(authRequest)=>{
  return axios({
      method:'GET',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/items`,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}
export const getItemById=(id)=>{
  return axios({
      method:'GET',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/items/${id}`,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}
export const addItem=(item)=>{
  return axios({
      method:'POST',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/items`,
      'data':item,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}
export const updateItem=(item,id)=>{
  return axios({
      method:'PUT',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/items/${id}`,
      'data':item,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}
export const deleteItem=(id)=>{
  return axios({
      method:'DELETE',
      url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/items/${id}`,
      headers:{
          'Authorization':'Bearer '+getToken()
      }
  })
}

