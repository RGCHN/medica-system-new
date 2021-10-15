 import { http } from '../request'

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function login(body) {
  return http.post('/login', body);
}

export async function register(body) {
  return http.post('/register', body);
}

export async function getUser() {
  return http.get('/getUser');
}

export async function getAnalyzeData() {
  return http.get('/patientsAnalyze')
}

export async function getPatientList() {
  return http.get('/getPatients')
}


