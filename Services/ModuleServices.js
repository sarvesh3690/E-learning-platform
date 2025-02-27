import axios from "axios";
import { CONSTANTS } from "../Constants/Constants";
const MODULE_URL = `http://localhost:${CONSTANTS.PORT}/module`;

export function getModuleNames() {
    return axios.get(`${MODULE_URL}`);
}