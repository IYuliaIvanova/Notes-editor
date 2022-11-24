import { ADD_NOTES, REMOVE_NOTES, COMPLETE_NOTES, UPDATE_NOTES, GET_NOTES_SUCCESS, GET_NOTES_STARTED, GET_NOTES_FAILURE } from "../actions";
import { ActionCreator } from "redux";
import { INotes } from "../../../interfaces/interfaces";

export interface IError {
    code: number;
    message: string;
}

export interface INotesIdentifier {
    id: number;
}

export interface INotesTag {
    tagsTextTask: string;
}

export interface IAxiosResponse {
    id: number;
    completed: boolean;
    text: string;
    tag: string
}

interface IAddNotesAction {
    type: typeof ADD_NOTES;
    payload: INotes;
}

interface IUpdateNotesAction {
    type: typeof UPDATE_NOTES;
    payload: {
        id: number,
        text: string,
        tagsText: string,
    };
}

interface IRemoveNotesAction {
    type: typeof REMOVE_NOTES;
    payload: INotesIdentifier;
}

interface ICompleteNotesAction {
    type: typeof COMPLETE_NOTES;
    payload: INotesIdentifier;
}

interface IGetNotesSuccessAction {
    type: typeof GET_NOTES_SUCCESS,
    payload: INotes[]
}

interface IGetNotesStartedAction {
    type: typeof GET_NOTES_STARTED,
    payload: {}
}

interface IGetNotesFailureAction {
    type: typeof GET_NOTES_FAILURE,
    payload: {
        error: IError
    }
}

export type TNotesActionTypes =
    IAddNotesAction
    | IUpdateNotesAction
    | IRemoveNotesAction
    | ICompleteNotesAction
    | IGetNotesSuccessAction
    | IGetNotesStartedAction
    | IGetNotesFailureAction; 

export const addNotes: ActionCreator<TNotesActionTypes> = (notes: INotes) => {
    return {
        type: ADD_NOTES,
        payload: {
            ...notes
        }
    }
}

export const updateNotes = (id: number, text: string, tagsText: string): TNotesActionTypes => {
    return {
        type: UPDATE_NOTES,
        payload: {
            id,
            text,
            tagsText,
        }
    }
}

export const removeNotes = (id: number): TNotesActionTypes => {
    return {
        type: REMOVE_NOTES,
        payload: {
            id
        }
    }
}

export const completeNotes = (id: number): TNotesActionTypes => {
    return {
        type: COMPLETE_NOTES,
        payload: {
            id
        }
    }
}

export const getNotesSuccess: ActionCreator<TNotesActionTypes> = (notes: INotes[]) => ({
    type: GET_NOTES_SUCCESS,
    payload: [
        ...notes
    ]
});

export const getNotesStarted: ActionCreator<TNotesActionTypes> = () => ({
    type: GET_NOTES_STARTED,
    payload: {}
});

export const getNotesFailure: ActionCreator<TNotesActionTypes> = (error: IError) => ({
    type: GET_NOTES_FAILURE,
    payload: {
        error
    }
});
