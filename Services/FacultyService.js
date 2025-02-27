import axios from "axios";
import { CONSTANTS } from "../Constants/Constants";
const FACULTY_URL = `http://localhost:${CONSTANTS.PORT}/faculty`;

export function getFacultyName() {
    return axios.get(`${FACULTY_URL}`);
}