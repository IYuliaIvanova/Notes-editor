import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { postNotes } from "../../api/fetchRequest/fetchNotes";
import { postTags } from "../../api/fetchRequest/fetchTags";
import { Loader } from "../../components/common-components/Loader/Loader";
import { NotesInput } from "../../components/notes-page-components/NotesInput/NotesInput";
import { NotesItemsList } from "../../components/notes-page-components/NotesItemsList/NotesItemsList";
import { TagsItemsList } from "../../components/notes-page-components/TagsItemsList/TagsItemsList";
import { ITag, INotes } from "../../mock-data/notes";
import { changeFilter } from "../../redux/actions/filtersActionCreators/actionCreator";
import { addTag, getTagsAction, removeTag } from "../../redux/actions/tagsActionCreators/actionCreators";
import { addNotes, completeNotes, updateNotes, removeNotes, getNotes, TNotesActionTypes } from "../../redux/actions/notesActionCreators/actionCreator";
import { filtersSelector } from "../../redux/selectors/filterSelectors/filtersSelectors";
import { tagsSelector } from "../../redux/selectors/tagsSelectors/tagsSelectors";
import { notesSelector } from "../../redux/selectors/notesSelectors/notesSelectors";
import { getTags } from "../../utils/tagsUtils";
import { Footer } from "../Footer/Footer";

type AppDispatch = ThunkDispatch<TNotesActionTypes, any, AnyAction>; 

export const NotesList = () => {
    const [notesText, setNotesText] = useState('');
    const [tagInput, setTagInput] = useState<ITag[]>([]);

    const { notes, isLoading } = useSelector(notesSelector);
    const filter = useSelector(filtersSelector);
    const { tags } = useSelector(tagsSelector);

    const dispatch: AppDispatch = useDispatch();

    const dispatchedAddNotes = useCallback(
        (task: INotes) => dispatch(addNotes({ id: task.id, text: task.text, isCompleted: task.isCompleted, tagsTextTask: task.tagsTextTask })),
        [dispatch]
    );
    const dispatchedAddTag = useCallback(
        (tag: ITag) => dispatch(addTag({ id: tag.id, textTags: tag.textTags })),
        [dispatch]
    );
    const dispatchedUpdateNotes = useCallback(
        (id: number, text: string, tags: string) => dispatch(updateNotes(id, text, tags)),
        [dispatch]
    );
    const dispatchedRemoveTag = useCallback(
        (id: number) => dispatch(removeTag(id)),
        [dispatch]
    );
    const dispatchedRemoveNotes = useCallback(
        (id: number) => dispatch(removeNotes(id)),
        [dispatch]
    );
    const dispatchedFilterChange = useCallback(
        (filter: string) => dispatch(changeFilter(filter)),
        [dispatch]
    );
    const dispatchedCompleteNotes = useCallback(
        (id: number) => dispatch(completeNotes(id)),
        [dispatch]
    );

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getTagsAction());
      }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;

        setTagInput(getTags(value))
        setNotesText(value)  
    }, []);

    const handleAddTask = () => {
        if(tagInput.length !== 0){
            tagInput.forEach(({id, textTags}) => {
                dispatchedAddTag({ id: id, textTags: textTags});
                dispatchedAddNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: textTags });
                postNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: textTags })
                postTags({ id: id, textTags: textTags});
            })
        } else {
            dispatchedAddNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: '' });
            postNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: '' });
        }
        setNotesText('');
    }

    const isTasksExist = useMemo(() => notes && (notes as INotes[]).length > 0, [notes]);

    const filterTasks = useCallback((tasks: INotes[]) => {
        if(filter !== 'all'){
            return tasks.filter(item => item.tagsTextTask.includes(filter))
        } else {
            return tasks
        }
    }, [filter, notes]);

    const filteredTasks = useMemo(() => filterTasks(notes), [notes, filterTasks]);

    return (
        <div className="notes-wrapper">
            <NotesInput value={notesText} onChange={handleInputChange} addNotes={handleAddTask}/>
            <span className="tag-title">Click on tag to filter</span>
            <TagsItemsList tags={tags} removeTag={dispatchedRemoveTag} filterChange={dispatchedFilterChange}/>
            {isLoading ? <Loader /> : <NotesItemsList tasksList={filteredTasks} updateNotes={dispatchedUpdateNotes} removeNotes={dispatchedRemoveNotes} completeNotes={dispatchedCompleteNotes}/>}
            {isTasksExist && <Footer amount={(notes as INotes[]).length} activeFilter={filter} filterChange={dispatchedFilterChange}/>}
        </div>
    )
}
