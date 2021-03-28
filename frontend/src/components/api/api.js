import axios from 'axios';
import {jwtDecoder} from '../common/functions';

const baseURL = 'http://54.255.190.88:3000/'
const userFragment = 'api/user/';

let _viewuser = 'viewuser';
let _adduser = 'adduser';
let _deleteuser = 'deleteuser';
let _statuschange = 'updateactivestatus';

let _viewrole = 'viewrole';
let _addrole = 'addrole';

let _checkuser = 'login';
let _usersearch = 'searchuser';

let _deletedUsers = 'viewdeleteuser';

let _changepassword = 'updatepassword';
let _sendpassword = 'sendpassword';

const options = {
  headers: { 'Content-Type': 'application/json' }
};

const dummy = { "group": "system", "mobile": "99405528282", "profile": "system", "createdById": "001", "createdByName": "Rajesh", "createdByRole": "Admin" };

// View user
export async function getUser(fragment) {
  if(fragment){fragment.replace(/\"/g, '')};
  let response = await axios.get(baseURL + userFragment + _viewuser+(fragment!==undefined?'?'+fragment:''), options);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    return response.data.data;
  }
}
// Add user
export async function addUser(userInfo) {
  let userData = { ...userInfo, ...dummy };
  let response = await axios.post(baseURL + userFragment + _adduser, userData, options);
  if (response.data.result === 'Success') {
    return response.data;
  } else {
    console.log('Error Found', response.data.result + ':' + response.data.message);
    return response.data
  }
}
// Delete user
export async function deleteUser(userInfo) {
  let userData = { email: userInfo.email }
  let response = await axios.post(baseURL + userFragment + _deleteuser, userData, options);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    console.log('user deleted');
    return response.data.data;
  }
}

export async function userStatusChange(userInfo) {
  let userData = { email: userInfo.email, isActive: !userInfo.isActive }
  let response = await axios.post(baseURL + userFragment + _statuschange, userData, options);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    return response.data.data;
  }
}


function _clearStorage() {
  sessionStorage.clear();
}
// login user
export async function checkUser(userInfo) {
  _clearStorage();
  let { username, password } = userInfo
  let userData = { email: userInfo.username, password: userInfo.password }

  let response = await axios.post(baseURL + userFragment + _checkuser, userData, options);
  if (!response.data.status === 200) {
    console.error('Error:', response.data.message);
    return response
  }
  else {
    let _decodedtoken = response.data.accessToken?jwtDecoder(response.data.accessToken):'';
    sessionStorage.setItem('auth-token', response.data.accessToken?.length > 0 ? response.data.accessToken : '');
    let role = _decodedtoken.role;
    response.data = {...response.data,role:role}
    return response;
  }
}

{/* ---   ROLES   --- */ }
// get roles
export async function getRoles() {
  let response = await axios.get(baseURL + userFragment + _viewrole);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    console.log(response.data.data);
    return response.data.data;
  }
}
//add roles
export async function addRole(userInfo,selectedRole) {
  let userData = { "role": userInfo.role, "reportingTo": selectedRole }
  let response = await axios.post(baseURL + userFragment + _addrole, userData, options);
  if (response.status === '200') {
    return response.data
  } else {
    return response
  }
}

//search user

export async function searchUser (query) {
  query = query.toLowerCase();

  let response = query ? await axios.get(baseURL+userFragment+_usersearch+'?data='+query) : await getUser();
  if(response.status !==200) {


    return response
  } else {

    response = response.data.data?response.data.data[0]:response;
    return response;
  }

}

// GET DELETED USERS
  export async function deletedUsers() {
    let response = await axios.get(baseURL+userFragment+_deletedUsers,options);

    return response.data.data;
  }


  // user change password

  export async function changepassword(email,password) {
    let userData = { email: email, password: password }
    let response = await axios.post(baseURL + userFragment + _changepassword, userData, options);
    if (!response.ok) {
      console.error('Error');
    }
    if (response) {
      console.log('user password changed');
      return response
    }
  }


  //send password

  export async function sendpassword(email) {
    let userData = { email: email }
    let response = await axios.post(baseURL + userFragment + _sendpassword, userData, options);
    if (!response.ok) {
      console.error('Error');
    }
    if (response) {
      console.log('user and pwd emailed');
      return response
    }
  }
{/** 
TODO:
1. Check the role added with status message and rewrite with status code
2. IN SEARCH USER, IF USER IS NOT FOUND HANDLE IS NOT THERE.

*/ }