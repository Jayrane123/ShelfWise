import axios from "axios";
import { getToken } from "./LocalStorage";

export function getBooks(){
    return axios.get("http://localhost:8080/books/get", {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
export function getAllBooks(){
    return axios.get("http://localhost:8080/books/getall", {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
export function userIssuedBooks(userEmail){
    return axios.get(`http://localhost:8080/books/issued/user/${encodeURIComponent(userEmail)}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function addBooks(formData){
    return axios.post("http://localhost:8080/books/add", formData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function updateBooks(id, formData){
    return axios.put(`http://localhost:8080/books/update/${id}`, formData, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
export function issueBookToUser(bookId, userEmail) {
  return axios.post(
    "http://localhost:8080/books/issue",
    { bookId, userEmail },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}

export function deleteBooks(id){
    return axios.delete(`http://localhost:8080/books/delete/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function ParticularBook(id){
    return axios.get(`http://localhost:8080/books/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}

export function bookUnAvailable(id){
    return axios.get(`http://localhost:8080/books/softdelete/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
export function bookAvailable(id){
    return axios.get(`http://localhost:8080/books/available/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
}
