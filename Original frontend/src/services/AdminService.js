import axios from "axios";
import { getToken } from "./LocalStorage";


export function RegisterAdmin(formData){
    
    return axios.post("http://localhost:8080/auth/admin/signup",formData,{
        headers:{'Authorization':`Bearer ${getToken()}`}
    });
}

export function SignInAdmin(formData){

    return axios.post("http://localhost:8080/auth/admin/signin",formData);
}