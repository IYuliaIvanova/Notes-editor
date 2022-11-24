import axios from "axios";
import { ITag } from "../../interfaces/interfaces";
import { FETCH_BASE } from "../fetch-constants";

export const postTags = (data: ITag) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.post("tags", data)
} 

export const deleteTags = (id: number) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.delete(`tags/${id}`)
} 