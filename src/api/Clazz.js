import axios from "axios";

export const findAll = (pageNum,pageSize) => {
  return axios.get("http://127.0.0.1:8085/clazz/findAll?pageNum="+pageNum+"&pageSize="+pageSize).then(res=>res);

};
export const save = (clazz) => {

  return axios.post("/clazz/save",clazz).then(res=>res);

};
export const deleteClazz = (id) => {

  return axios.post("/clazz/delete?id="+id).then(res=>res);

};
export const update = (clazz) => {

  return axios.post("/clazz/update",clazz).then(res=>res);

};
export const findAllCollege = (pageNum,pageSize) => {
  return axios.get("http://127.0.0.1:8085/college/findAll?pageNum="+1+"&pageSize="+10).then(res=>res);

};
