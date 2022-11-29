import axios from "axios";
import { Dispatch } from "redux";
import { ITag } from "../../interfaces/interfaces";
import { getTagsFailure, getTagsStarted, getTagsSuccess, IAxiosResponse, TTagsActionTypes } from "../../redux/actions/tagsActionCreators/actionCreators";
import { FETCH_BASE } from "../fetch-constants";

export const postTags = (data: ITag) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.post("tags", data)
} 

export const deleteTags = (id: number) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.delete(`tags/${id}`)
} 

export const getTags = () => {
    return (dispatch: Dispatch<TTagsActionTypes>) => {
        dispatch(getTagsStarted());

        const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})

        fetchInstance
            .get<IAxiosResponse[]>(`tags`)
            .then(({ data }) => {
                const mappedResponse = data.map(item => ({ ...item }));
                setTimeout(() => {
                    dispatch(getTagsSuccess(mappedResponse));
                }, 3000);
            })
            .catch(err => {
                dispatch(getTagsFailure(err));
            });
    };
};

