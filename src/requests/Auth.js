import axios from 'axios'

const API_URL_ADMIN = process.env.REACT_APP_API_URL+"/client";
const API_URL_USER = process.env.REACT_APP_API_URL+"/user";


export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL_ADMIN}/verify_token`
export const LOGIN_URL = `${API_URL_ADMIN}/login`
export const REGISTER_URL = `${API_URL_ADMIN}/register`
export const REQUEST_PASSWORD_URL = `${API_URL_ADMIN}/forgot_password`
export const VERIFY_OTP = `${API_URL_ADMIN}/verify-otp`
export const RESEND_OTP = `${API_URL_ADMIN}/resend-otp`
export const GET_USER_BY_ID = `${API_URL_ADMIN}/id`
export const GET_USER_BY_IDS = `${API_URL_ADMIN}/candidates`
export const GET_USER_IMAGE = `${API_URL_ADMIN}/profile`
export const UPDATE_USER_IMAGE = `${API_URL_ADMIN}/profile`
export const UPDATE_IMAGE_IN_DB = `${API_URL_ADMIN}/update`
export const UPDATE_USER_DATA = `${API_URL_ADMIN}/update`
export const FORGOT_PASSWORD = `${API_URL_ADMIN}/forgot-password`
export const CHECK_PASSWORD = `${API_URL_ADMIN}/check-password`
export const GET_ALL_CANDIDATES = `${API_URL_ADMIN}/list`
export const GET_USER_DOCS = `${API_URL_USER}/document`

// Server should return AuthModel
export function login(email, password) {
  return axios.post(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
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
  })
}

export function getAllCandidates() {
  return axios.get(GET_ALL_CANDIDATES)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token) {
  return axios.post(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}

export function verifyEmailOtp(otp, email) {
  return axios.put(VERIFY_OTP, {
    otp: otp,
    email: email,
  })
}

export function resendOtp(email, newemail) {
  return axios.put(RESEND_OTP, {
    email: email,
    newemail: newemail,
  })
}

export function getUserDataById(id) {
  return axios.get(GET_USER_BY_ID + '/' + id)
}

export function getUserDataByIds(id) {
  return axios.get(GET_USER_BY_IDS + "?id="+id)
}


export function getUserProfile(user, image) {
  return axios.get(GET_USER_IMAGE + '/' + user + '/' + image)
}

export function updateUserImage(user, image) {
  const data = new FormData()
  data.append('file', image)
  return axios.post(UPDATE_USER_IMAGE + '/' + user, data)
}

export function getUserImage(path) {
  return axios.get(UPDATE_USER_IMAGE + '/' + path)
}

export function updateAvatar(id, avatar) {
  return axios.put(UPDATE_IMAGE_IN_DB + '/' + id, {
    avatar: avatar,
  })
}

export function resetPassword(email) {
  return axios.post(FORGOT_PASSWORD, {
    email: email,
  })
}
export function updateUser(id, body) {
  return axios.put(UPDATE_USER_DATA + '/' + id, {
    ...body,
  })
}

export function checkPassword(email, password) {
  return axios.post(CHECK_PASSWORD, {
    email: email,
    password: password,
  })
}

export function getUserDocuments(id) {
  return axios.get(GET_USER_DOCS+'?id='+id)
}