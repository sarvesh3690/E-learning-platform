import axios from "axios";
import { CONSTANTS } from "../Constants/Constants";
const STUDENT_URL = `http://localhost:${CONSTANTS.PORT}/student`;

export function getAllStudent() {
    return axios.get(`${STUDENT_URL}`);
}

export function addStudent(student) {
    return axios.post(`${STUDENT_URL}/addstudent`, student);
}

export function deleteStudent(id) {
    return axios.delete(`${STUDENT_URL}/deletestudent/${id}`);
}

