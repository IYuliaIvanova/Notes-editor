import { CHANGE_FILTER } from "../../actions/actions";
import { TFilterActionTypes } from "../../actions/filtersActionCreators/actionCreator";

const initialState = 'all';

export const filtersReducer = (state = initialState, { type, payload }: TFilterActionTypes) => {
    switch (type) {
        case CHANGE_FILTER:
            return payload.filter;
        default:
            return state;
    }
}
