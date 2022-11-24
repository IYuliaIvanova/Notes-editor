import axios from "axios";
import { Dispatch } from "redux";
import { INotes } from "../../interfaces/interfaces";
import { getNotesFailure, getNotesStarted, getNotesSuccess, IAxiosResponse, TNotesActionTypes } from "../../redux/actions/notesActionCreators/actionCreator";
import { FETCH_BASE} from "../fetch-constants";

export const postNotes = (data: INotes) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.post("notes", data)
} 

export const deleteNotes = (id: number) => {
    const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})
    return fetchInstance.delete(`notes/${id}`)
}

export const getNotes = () => {
    return (dispatch: Dispatch<TNotesActionTypes>) => {
        dispatch(getNotesStarted());

        const fetchInstance = axios.create({ baseURL: `${FETCH_BASE}`})

        fetchInstance
            .get<IAxiosResponse[]>('notes')
            .then(res => {
                const mappedResponse = res.data.map(item => ({ ...item, isCompleted: item.completed, text: item.text, textTag: item.tag }));
                setTimeout(() => {
                    dispatch(getNotesSuccess(mappedResponse));
                }, 3000);
            })
            .catch(err => {
                dispatch(getNotesFailure(err));
            });
    };
};


