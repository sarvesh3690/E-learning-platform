import axios from "axios";
import { CONSTANTS } from "../Constants/Constants";
const RECORDING_URL = `http://localhost:${CONSTANTS.PORT}/recording`

export function addRecording(recording) {
    return axios.post(`${RECORDING_URL}/addrecording`, recording)
}

export function getRecordings() {
    return axios.get(`${RECORDING_URL}`);
}