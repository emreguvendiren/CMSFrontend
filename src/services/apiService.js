import { SERVER_URL } from "./parameters";

export const getRequest = async (path, callback) => {
  

    console.log(path);
 
     fetch(SERVER_URL + path, {
       //headers: { Authorization: token }
     })
       .then(response => response.json())
       .then(responseData => {
         console.log(responseData);
         callback(responseData);
         //return(responseData.message);
 
   
       }) .catch(err => {
         
         
       })
 
       
 }