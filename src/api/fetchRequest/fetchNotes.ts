import axios from "axios";
import { INotes } from "../../interfaces/interfaces";
import { FETCH_BASE} from "../fetch-constants";

export const postNotes = (data: INotes) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.post("notes", data)
} 

export const deleteNotes = (id: number) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.delete(`notes/${id}`)
}


