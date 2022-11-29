import { ITag } from "../../../interfaces/interfaces";
import { ADD_TAG, GET_TAGS_FAILURE, GET_TAGS_STARTED, GET_TAGS_SUCCESS, REMOVE_TAG } from "../../actions/actions";
import { IError, ITagIdentifier, TTagsActionTypes } from "../../actions/tagsActionCreators/actionCreators";

interface IInitialState {
    tags: ITag[],
    isLoading: boolean;
    error: IError | null;
}

const initialState = {
    tags: [] as ITag[],
    isLoading: false,
    error: null
};

export const tagsReducer = (state = initialState, { type, payload }: TTagsActionTypes): IInitialState => {
    switch (type) {
        case ADD_TAG :
            return {
                ...state, tags: [
                    ...state.tags, {
                        id: payload.id,
                        text: payload.text
                    }
                ]
            };
        case REMOVE_TAG :
            return {
                ...state, tags: state.tags.filter(tag => tag.id !== (payload as ITagIdentifier).id)
            };
        case GET_TAGS_STARTED:
            return {
                ...state, isLoading: true, 
            };
        case GET_TAGS_SUCCESS:
            return {
                ...state, tags: [
                    ...payload
                ], isLoading: false,
            };
        case GET_TAGS_FAILURE:
            return {
                ...state, error: payload.error, isLoading: false,
            };
        default:
            return state;
    }
}
