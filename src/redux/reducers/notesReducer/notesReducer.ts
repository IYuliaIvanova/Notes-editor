import { INotes } from "../../../interfaces/interfaces";
import { ADD_NOTES, COMPLETE_NOTES, UPDATE_NOTES, REMOVE_NOTES, GET_NOTES_STARTED, GET_NOTES_SUCCESS, GET_NOTES_FAILURE } from "../../actions/actions";
import { IError, INotesIdentifier, TNotesActionTypes } from "../../actions/notesActionCreators/actionCreator";

interface IInitialState {
    notes: INotes[];
    isLoading: boolean;
    error: IError | null;
}

const initialState = {
    notes: [] as INotes[],
    isLoading: false,
    error: null
};

export const notesReducer = (state = initialState, { payload, type }: TNotesActionTypes): IInitialState => {
    switch (type) {
        case ADD_NOTES :
            return {
                ...state, notes: [
                    ...state.notes, {
                        id: payload.id,
                        text: payload.text,
                        isCompleted: payload.isCompleted,
                        tagsTextTask: payload.tagsTextTask,
                    }
                ]
            };
        case UPDATE_NOTES :
            return {
                ...state, notes: state.notes.map(task => {
                    if(task.id === (payload as INotesIdentifier).id){
                        return {
                            ...task, text: payload.text, tagsTextTask: payload.tagsText
                        }
                    } 
                    return {
                        ...task
                    }
                })
            };
        case REMOVE_NOTES :
            return {
                ...state, notes: state.notes.filter(task => task.id !== (payload as INotesIdentifier).id)
            };
        case COMPLETE_NOTES :
            return {
                ...state, notes: state.notes.map(task => {
                    return {
                        ...task, isCompleted: task.id === (payload as INotesIdentifier).id ? !task.isCompleted : task.isCompleted
                    }
                })
            };
        case GET_NOTES_STARTED:
            return {
                ...state, isLoading: true, 
            };
        case GET_NOTES_SUCCESS:
            return {
                ...state, notes: [
                    ...payload
                ], isLoading: false,
            };
        case GET_NOTES_FAILURE:
            return {
                ...state, error: payload.error, isLoading: false,
            };
        default:
            return state;
    }
}
