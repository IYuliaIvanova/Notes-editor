import axios from "axios";
import { ITag } from "../../interfaces/interfaces";
import { FETCH_BASE, FETCH_POST_TAGS } from "../fetch-constants";

export const postTags = (data: ITag) => 
    axios
        .post(`${FETCH_BASE}${FETCH_POST_TAGS}`, data)

export const delTags = (id: number) => 
    axios
        .delete(`${FETCH_BASE}${FETCH_POST_TAGS}/${id}`)
