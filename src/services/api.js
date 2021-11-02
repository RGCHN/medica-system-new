import { http, modelHttp } from '../request';

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

// 获取当前用户
export async function getUser() {
  return http.get('/getUser');
}

export async function getUserDetail(body) {
  return http.post('/userDetail', body);
}

export async function getAnalyzeData() {
  return http.get('/patientsAnalyze');
}

export async function updateRole(body) {
  return http.post('/updateRole', body);
}

export async function deleteUser(body) {
  return http.post('/deleteUser', body);
}

// 获取用户列表
export async function getUserList() {
  return http.get('/userInfo');
}

export async function getPatientList() {
  return http.get('/getPatients');
}

export async function addPatient(body) {
  return http.post('/addPatient', body);
}

export async function getPatientByID(body) {
  return http.post('/getPatientByID', body);
}

export async function uploadImgs(body, config) {
  return modelHttp.post('/imgUpload', body, config);
}

export async function analyzeImgs(body) {
  return modelHttp.post('/analyze', body);
}

export async function getReport(body) {
  return modelHttp.post('getReport', body);
}
