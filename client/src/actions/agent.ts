import axios, { AxiosResponse } from 'axios';
import { PaginatedCourse } from '../models/paginatedCourse';

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url:string) => axios.get<T>(url).then(responseBody),
    post: <T>(url:string, body : {}) => axios.post<T>(url).then(responseBody),
    put: <T>(url:string, body : {}) => axios.put<T>(url).then(responseBody),
    del: <T>(url:string) => axios.delete<T>(url).then(responseBody),
}

const Courses = {
    list : () => requests.get<PaginatedCourse>("/courses")
}

const agent = {
    Courses,
}

export default agent;