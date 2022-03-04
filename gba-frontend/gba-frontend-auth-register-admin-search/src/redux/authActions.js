import {AUTH_REQ,AUTH_SUCCESS,AUTH_FAILURE} from './types';


export const authenticate=()=>{
    return {
        type:AUTH_REQ
    }
}


export const authSuccess= (content)=>{
    localStorage.setItem('token',content.token);
    return {
        type:AUTH_SUCCESS,
        payload:content
    }
}

export const authFailure=(error)=>{
    return {
        type:AUTH_FAILURE,
        payload:error
    }
}