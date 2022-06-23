import { CHANGE_FILTER } from "../actions"

interface IChangeFilterAction {
    type: typeof CHANGE_FILTER;
    payload: {
        filter: string;
    };
}

export type TFilterActionTypes = IChangeFilterAction;

export const changeFilter = (filter: string): TFilterActionTypes => {
    return {
        type: CHANGE_FILTER,
        payload: {
            filter
        }
    }
}
