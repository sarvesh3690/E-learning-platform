import axios from "axios";
import { CONSTANTS } from "../Constants/Constants";
const MODULE_COORDINATOR_URL = `http://localhost:${CONSTANTS.PORT}/modulecoordinator`;

export function getAllModuleCoordinator() {
    return axios.get(`${MODULE_COORDINATOR_URL}`);
}

export function addModuleCoordinator(coordinator) {
    return axios.post(`${MODULE_COORDINATOR_URL}/addmodulecoordinator`, coordinator);
}

export function deleteModuleCoordinator(id) {
    return axios.delete(`${MODULE_COORDINATOR_URL}/deletemodulecoordinator/${id}`);
}

