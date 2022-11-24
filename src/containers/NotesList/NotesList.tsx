import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getNotes, postNotes } from "../../api/fetchRequest/fetchNotes";
import { postTags } from "../../api/fetchRequest/fetchTags";
import { Loader } from "../../components/common/Loader/Loader";
import { NotesInput } from "../../components/notesPage/NotesInput/NotesInput";
import { NotesItemsList } from "../../components/notesPage/NotesItemsList/NotesItemsList";
import { TagsItemsList } from "../../components/notesPage/TagsItemsList/TagsItemsList";
import { ITag, INotes } from "../../interfaces/interfaces";
import { changeFilter } from "../../redux/actions/filtersActionCreators/actionCreator";
import { addTag, getTagsAction, removeTag } from "../../redux/actions/tagsActionCreators/actionCreators";
import { addNotes, completeNotes, updateNotes, removeNotes, TNotesActionTypes } from "../../redux/actions/notesActionCreators/actionCreator";
import { getTags } from "../../utils/tagsUtils";
import { Footer } from "../../Layout/Footer/Footer";
import { RootState } from "../../redux/reducers";

type AppDispatch = ThunkDispatch<TNotesActionTypes, any, AnyAction>; 

export const NotesList = () => {
    const [notesText, setNotesText] = useState('');
    const [tagInput, setTagInput] = useState<ITag[]>([]);

    const { notes, isLoading } = useSelector((state: RootState) => state.notes);
    const filter = useSelector((state: RootState) => state.filter);
    const { tags } = useSelector((state: RootState) => state.tags);

    const dispatch: AppDispatch = useDispatch();

    const dispatchedAddNotes = (task: INotes) => dispatch(addNotes({ id: task.id, text: task.text, isCompleted: task.isCompleted, tagsTextTask: task.tagsTextTask }))
    const dispatchedAddTag = (tag: ITag) => dispatch(addTag({ id: tag.id, textTags: tag.textTags }))
    const dispatchedUpdateNotes = (id: number, text: string, tags: string) => dispatch(updateNotes(id, text, tags))
    const dispatchedRemoveTag = (id: number) => dispatch(removeTag(id))
    const dispatchedRemoveNotes = (id: number) => dispatch(removeNotes(id))
    const dispatchedFilterChange = (filter: string) => dispatch(changeFilter(filter))
    const dispatchedCompleteNotes = (id: number) => dispatch(completeNotes(id))

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
            tagInput.forEach(({ id, textTags }) => {
                dispatchedAddTag({ id: id, textTags: textTags });
                dispatchedAddNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: textTags });
                postNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tagsTextTask: textTags })
                postTags({ id: id, textTags: textTags });
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

    const filteredTasks = filterTasks(notes)

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
