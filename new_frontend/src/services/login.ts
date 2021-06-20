import request from '@/utils/request';
import axios from 'axios';

let base_url = 'http://ec2-54-255-190-88.ap-southeast-1.compute.amazonaws.com:3000';

let url_fragment = '/api/user/';
// adding url's together
base_url = base_url + url_fragment;
const headerOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
};



export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  codeNumber: number;

};

// View user


export async function AccountLogin(params: LoginParamsType) {
  
  let userData = {

    'username': params.userName,
    'password': params.password
  }
  let response = await axios.post(base_url + 'login', userData, headerOptions);
  return response.data;
}

// Forgot password action
export async function SendCode(params: LoginParamsType): Promise<any> {

  let userDataObject = {
    "email": params.userName
  }

  let response = await axios.post(base_url + 'sendcode', userDataObject, headerOptions);
  return response
}

// Verify code action
export async function VerifyCode(userName: any, codeNumber: any): Promise<any> {
  
  let userDataObject = {
    "email": userName,
    "code":parseInt(codeNumber)
}
let response = await axios.post(base_url + 'verifycode', userDataObject, headerOptions);
return response;
}  

// Change password after code verification 
export async function ChangePassword(userName: any, password: any): Promise<any> {
  let userDataObject = {
    "email": userName,
    "password": password
};
let response = await axios.post(base_url+'updatepassword',userDataObject, headerOptions);
return response;
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
