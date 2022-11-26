import axios from 'axios';

export const getAllEmployee = async () => {
  return await axios({
    method: "GET",
    url: `/api/v1/employee/`,
  });
};

export const deleteEmployee = async (empId) => {
  return await axios({
    method: "DELETE",
    url: `/api/v1/employee/${empId}`,
  });
};

export const createEmployee = async (data) => {
  return await axios({
    method: "POST",
    url: `/api/v1/employee/`,
    data: data,
  });
};

export const updateEmployee = async (data, empId) => {
  return await axios({
    method: "PUT",
    url: `/api/v1/employee/${empId}`,
    data: data,
  });
};

export const singleEmployee = async (empId) => {
  return await axios({
    method: "GET",
    url: `/api/v1/employee/${empId}`,
  });
};
