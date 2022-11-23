import axios from "axios";
import { Dispatch } from "react";
import { ActionCreator } from "redux";
import { ITag } from "../../../interfaces/interfaces";
import { ADD_TAG, GET_TAGS_FAILURE, GET_TAGS_STARTED, GET_TAGS_SUCCESS, REMOVE_TAG } from "../actions"

export interface IError {
    code: number;
    message: string;
}

export interface ITagIdentifier {
    id: number;
}

export interface IAxiosResponse {
    id: number;
    text: string;
}

interface IAddTagAction {
    type: typeof ADD_TAG;
    payload: ITag;
}

interface IRemoveTagAction {
    type: typeof REMOVE_TAG;
    payload: ITagIdentifier;
}

interface IGetTagsSuccessAction {
    type: typeof GET_TAGS_SUCCESS,
    payload: ITag[]
}

interface IGetTagsStartedAction {
    type: typeof GET_TAGS_STARTED,
    payload: {}
}

interface IGetTagsFailureAction {
    type: typeof GET_TAGS_FAILURE,
    payload: {
        error: IError
    }
}

export type TTagsActionTypes = 
    IAddTagAction 
    | IRemoveTagAction
    | IGetTagsStartedAction
    | IGetTagsSuccessAction
    | IGetTagsFailureAction;

export const addTag = (tag: ITag): TTagsActionTypes => {
    return {
        type: ADD_TAG,
        payload: {
            ...tag
        }
    }
}

export const removeTag = (id: number): TTagsActionTypes => {
    return {
        type: REMOVE_TAG,
        payload: {
            id
        }
    }
}

export const getTagsAction = () => {
    return (dispatch: Dispatch<TTagsActionTypes>) => {
        dispatch(getTagsStarted());

        axios
            .get<IAxiosResponse[]>(`http://localhost:3001/tags`)
            .then(res => {
                const mappedResponse = res.data.map(item => ({ ...item }));
                setTimeout(() => {
                    dispatch(getTagsSuccess(mappedResponse));
                }, 3000);
            })
            .catch(err => {
                dispatch(getTagsFailure(err));
            });
    };
};

const getTagsSuccess: ActionCreator<TTagsActionTypes> = (tags: ITag[]) => ({
    type: GET_TAGS_SUCCESS,
    payload: [
        ...tags
    ]
});

const getTagsStarted: ActionCreator<TTagsActionTypes> = () => ({
    type: GET_TAGS_STARTED,
    payload: {}
});

const getTagsFailure: ActionCreator<TTagsActionTypes> = (error: IError) => ({
    type: GET_TAGS_FAILURE,
    payload: {
        error
    }
});
