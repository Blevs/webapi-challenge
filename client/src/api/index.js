import axios from 'axios';

const url = "http://localhost:4000/api";

export const getProjects = () => {
  return axios.get(`${url}/projects`);
};

export const getProject = (id) => {
  return axios.get(`${url}/projects/${id}`);
};
