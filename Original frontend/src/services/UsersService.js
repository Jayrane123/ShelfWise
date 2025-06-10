import axios from "axios";
import { getToken } from "./LocalStorage";


export function RegisterUser(formData){

    return axios.post("http://localhost:8080/auth/user/signup",formData);
}

export function SignInUser(formData){
    return axios.post("http://localhost:8080/auth/user/signin",formData);
}
export function getAllUsers(){
    return axios.get("http://localhost:8080/user/getall", {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}