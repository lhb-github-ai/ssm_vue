import axios from 'axios'

export const login = (user) => {
  return axios.post('/user/check', user).then(res => res)
}

export const findAll = (pageNum, pageSize) => {
  return axios.get('http://127.0.0.1:8085/user/findAll?pageNum=' + pageNum + '&pageSize=' + pageSize).then(res => res)
}
export const save = (user) => {
  return axios.post('/user/save', user).then(res => res)
}
export const deleteUser = (id) => {
  return axios.post('/user/delete?id=' + id).then(res => res)
}
export const update = (user) => {
  return axios.post('/user/update', user).then(res => res)
}
export const login2 = (user) => {
  return axios.post('/student/check', user).then(res => res)
}
