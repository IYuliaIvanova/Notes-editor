import axios from "axios";
import { INotes } from "../../mock-data/notes";
import { FETCH_BASE, FETCH_POST_NOTES } from "../fetch-constants";

export const postNotes = (data: INotes) => 
    axios
        .post(`${FETCH_BASE}${FETCH_POST_NOTES}`, data)

export const delNotes = (id: number) => 
    axios
        .delete(`${FETCH_BASE}${FETCH_POST_NOTES}/${id}`)


