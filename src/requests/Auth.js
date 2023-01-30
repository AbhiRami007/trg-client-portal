import axios from 'axios'

const API_URL_ADMIN = process.env.REACT_APP_API_URL+"/client";
const API_URL_USER = process.env.REACT_APP_API_URL+"/user";

let userData = JSON.parse(localStorage.getItem("user-information"));
let api_token,refreshToken;
if(userData){
api_token= userData.api_token;
refreshToken=userData.refreshToken

}

const config = {
  headers: {
    "authorization":`Bearer ${api_token}`,
    "RefreshToken":refreshToken,
    "Content-Type": "application/json",
  },
};

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL_ADMIN}/verify-token`
export const LOGIN_URL = `${API_URL_ADMIN}/login`
export const REGISTER_URL = `${API_URL_ADMIN}/register`
export const REQUEST_PASSWORD_URL = `${API_URL_ADMIN}/forgot-password`
export const VERIFY_OTP = `${API_URL_ADMIN}/verify-otp`
export const RESEND_OTP = `${API_URL_ADMIN}/resend-otp`
export const GET_USER_BY_ID = `${API_URL_ADMIN}/id`
export const GET_USER_BY_IDS = `${API_URL_ADMIN}/candidates`
export const GET_USER_IMAGE = `${API_URL_ADMIN}/profile`
export const UPDATE_USER_IMAGE = `${API_URL_ADMIN}/profile`
export const UPDATE_IMAGE_IN_DB = `${API_URL_ADMIN}/update`
export const UPDATE_USER_DATA = `${API_URL_ADMIN}/update`
export const GOOGLE_URL = `${API_URL_ADMIN}/google/login`;
export const FORGOT_PASSWORD = `${API_URL_ADMIN}/forgot-password`
export const CHECK_PASSWORD = `${API_URL_ADMIN}/check-password`
export const GET_ALL_CANDIDATES = `${API_URL_ADMIN}/list`

export const GET_USER_DOCS = `${API_URL_USER}/document`


// Server should return AuthModel
export function login(email, password) {
  return axios.post(LOGIN_URL, {
    email,
    password,
  },config)
}

export function googleLogin(code) {
  return axios.get(GOOGLE_URL + "?code=" + code.code);
}

// Server should return AuthModel
export function registerUser(
  email,
  name,
  password,
  password_confirmation
) {
  return axios.post(REGISTER_URL, {
    email,
    name: name,
    password,
    password_confirmation,
    role: 'client',
    joined_on: new Date(),
  },config)
}

export function getAllCandidates() {
  return axios.get(GET_ALL_CANDIDATES,config)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, {
    email,
  },config)
}

export function getUserByToken(token) {
  return axios.post(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  },config)
}

export function verifyEmailOtp(otp, email) {
  return axios.put(VERIFY_OTP, {
    otp: otp,
    email: email,
  },config)
}

export function resendOtp(email, newemail) {
  return axios.put(RESEND_OTP, {
    email: email,
    newemail: newemail,
  },config)
}

export function getUserDataById(id) {
  return axios.get(GET_USER_BY_ID + '/' + id,config)
}

export function getUserDataByIds(id) {
  return axios.get(GET_USER_BY_IDS + "?id="+id,config)
}


export function getUserProfile(user, image) {
  return axios.get(GET_USER_IMAGE + '/' + user + '/' + image,config)
}

export function updateUserImage(user, image) {
  const data = new FormData()
  data.append('file', image)
  return axios.post(UPDATE_USER_IMAGE + '/' + user, data,config)
}

export function getUserImage(path) {
  return axios.get(UPDATE_USER_IMAGE + '/' + path,config)
}

export function updateAvatar(id, avatar) {
  return axios.put(UPDATE_IMAGE_IN_DB + '/' + id, {
    avatar: avatar,
  },config)
}

export function resetPassword(email) {
  return axios.post(FORGOT_PASSWORD, {
    email: email,
  },config)
}
export function updateUser(id, body) {
  return axios.put(UPDATE_USER_DATA + '/' + id, {
    ...body,
  },config)
}

export function checkPassword(email, password) {
  return axios.post(CHECK_PASSWORD, {
    email: email,
    password: password,
  },config)
}

export function getUserDocuments(id) {
  return axios.get(GET_USER_DOCS+'?id='+id,config)
}