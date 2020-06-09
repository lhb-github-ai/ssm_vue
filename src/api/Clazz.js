import axios from "axios";

export const findAll = (pageNum,pageSize) => {
  return axios.get("http://127.0.0.1:8085/college/findAll?pageNum="+pageNum+"&pageSize="+pageSize).then(res=>res);

};
export const save = (college) => {

  return axios.post("/college/save",college).then(res=>res);

};
export const deleteCollege = (id) => {

  return axios.post("/college/delete?id="+id).then(res=>res);

};
export const update = (college) => {

  return axios.post("/college/update",college).then(res=>res);

};
