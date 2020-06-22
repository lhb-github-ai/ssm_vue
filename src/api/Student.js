import axios from 'axios'

export const findAll = (pageNum, pageSize) => {
  return axios.get('http://127.0.0.1:8085/student/findAll?pageNum=' + pageNum + '&pageSize=' + pageSize).then(res => res)
}
export const save = (student) => {
  return axios.post('/student/save', student).then(res => res)
}
export const deleteStudent = (id) => {
  return axios.post('/student/delete?id=' + id).then(res => res)
}
export const update = (student) => {
  return axios.post('/student/update', student).then(res => res)
}
export const findAllCollege = (pageNum, pageSize) => {
  return axios.get('http://127.0.0.1:8085/college/findAll?pageNum=' + 1 + '&pageSize=' + 10).then(res => res)
}
export const findAllClazz = (gradeId) => {
  return axios.get('http://127.0.0.1:8085/clazz/findAllClazz?gradeId=' + gradeId).then(res => res)
}
export const findAllClazzName = (name) => {
  return axios.get('http://127.0.0.1:8085/clazz/findAllClazzName?name=' + name).then(res => res)
}
export const findPerson = (studentName) => {
  return axios.post('http://127.0.0.1:8085/student/findOne?studentName=' + studentName).then(res => res)
}
