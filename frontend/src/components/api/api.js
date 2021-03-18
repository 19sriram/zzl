import axios from 'axios';

const baseURL = 'http://54.255.190.88:3000/'
const userFragment = 'api/user/';

let _viewuser = 'viewuser';
let _adduser = 'adduser';
let _deleteuser = 'deleteuser';

const options = {
  headers: {'Content-Type': 'application/json'}
};

const dummy = {"group":"system", "phonenumber":"99405528282", "profile":"system", "createdById":"001", "createdByName":"Rajesh", "createdByRole":"Admin"};

// View user
export async function getUser() {
  let response = await axios.get(baseURL + userFragment + _viewuser,options);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    return response.data.data;
  }
}
// Add user
export async function addUser(userInfo) {
  let userData = {...userInfo,...dummy};
  let response = await axios.post(baseURL + userFragment + _adduser,userData,options);
  if (response.data.result==='Success') {
    return response.data;
  } else {
    console.log('Error Found',response.data.result + ':'+response.data.message);
    return response.data
  }
}
// Delete user
export async function deleteUser(userInfo) {
  let userData = {email:userInfo}
  let response = await axios.post(baseURL + userFragment + _deleteuser,userData,options);
  if (!response.ok) {
    console.error('Error');
  }
  if (response) {
    return response.data.data;
  }
}