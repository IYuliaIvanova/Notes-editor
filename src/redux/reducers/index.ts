import { combineReducers } from 'redux';
import { filtersReducer } from './filtersReducer/filtersReducer';
import { tagsReducer } from './tagsReducer/tagsReducer';
import { notesReducer } from './notesReducer/notesReducer';

const rootReducer = combineReducers({
    notes: notesReducer,
    filter: filtersReducer,
    tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
