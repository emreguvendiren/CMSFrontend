import { SERVER_URL } from "./parameters";

export const getRequest = async (path,token, callback) => {
  

    //console.log(path);
   //console.log(token)
     fetch(SERVER_URL + path, {
       headers: { Authorization: "Bearer "+token, mode: 'no-cors' }, 
     })
       .then(response => response.json())
       .then(responseData => {
         //console.log(responseData);
         callback(responseData);
         //return(responseData.message);
        
   
       }) .catch(err => {
       })
 
       
 }

 export const postRequestWCallback = async (path,token, data,callback) => {

  fetch(SERVER_URL + path, {

    headers: {  "content-type": "application/json", Authorization:"Bearer " +token },
     method:'POST',
    body:JSON.stringify(data)
  }).then(response => response.json())
  .then(responseData => {
    callback(responseData);

  }) .catch(err => {
    //sessionStorage.setItem("jwt",null);
    //sessionStorage.setItem("isAuthenticated",false);
    //window.location.href='/login'
  })



}

export const postRequest = async (path,token, data) => {
  console.log(token)

     fetch(SERVER_URL + path, {

       headers: {  "content-type": "application/json", Authorization: token },
        method:'POST',
       body:JSON.stringify(data)
     }).then((response) => response)
     .then((responseJson) => {
      console.log(responseJson);

   }).catch(err => {
        console.error('Post Hata: ',err);
         //sessionStorage.setItem("jwt",null);
         //sessionStorage.setItem("isAuthenticated",false);
         //window.location.href='/login'
       }) 
 }

 export const postRequestForAuthWCallback = async (path, data,callback) => {

  fetch(SERVER_URL + path, {

    headers: {  "content-type": "application/json" },
     method:'POST',
    body:JSON.stringify(data)
  }).then(response => response.json())
  .then(responseData => {
    callback(responseData);

  }) .catch(err => {
    //sessionStorage.setItem("jwt",null);
    //sessionStorage.setItem("isAuthenticated",false);
    //window.location.href='/login'
  })



}
