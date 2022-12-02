import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getNotes, postNotes } from "../../api/fetchRequest/fetchNotes";
import { getTags, postTags } from "../../api/fetchRequest/fetchTags";
import { Loader } from "../../components/common/Loader/Loader";
import { NotesInput } from "../../components/notesPage/NotesInput/NotesInput";
import { NotesItemsList } from "../../components/notesPage/NotesItemsList/NotesItemsList";
import { TagsItemsList } from "../../components/notesPage/TagsItemsList/TagsItemsList";
import { ITag, INotes, ITagNotes } from "../../interfaces/interfaces";
import { changeFilter } from "../../redux/actions/filtersActionCreators/actionCreator";
import { addTag, removeTag } from "../../redux/actions/tagsActionCreators/actionCreators";
import { addNotes, completeNotes, updateNotes, removeNotes, TNotesActionTypes } from "../../redux/actions/notesActionCreators/actionCreator";
import { addNewTags, getTagNotes, splitTags } from "../../utils/tagsUtils";
import { Footer } from "../../Layout/Footer/Footer";
import { RootState } from "../../redux/reducers";

type AppDispatch = ThunkDispatch<TNotesActionTypes, any, AnyAction>; 

export const NotesList = () => {
    const [notesText, setNotesText] = useState('');
    const [tagsText, setTagsText] = useState<string[]>([]);

    const { notes, isLoading } = useSelector((state: RootState) => state.notes);
    const filter = useSelector((state: RootState) => state.filter);
    const { tags } = useSelector((state: RootState) => state.tags);

    const dispatch: AppDispatch = useDispatch();

    const dispatchedAddNotes = (task: INotes) => dispatch(addNotes({ id: task.id, text: task.text, isCompleted: task.isCompleted, tags: task.tags }))
    const dispatchedAddTag = (tag: ITag) => dispatch(addTag({ id: tag.id, text: tag.text }))
    const dispatchedUpdateNotes = (id: number, text: string, tags: ITagNotes[]) => dispatch(updateNotes(id, text, tags))
    const dispatchedRemoveTag = (id: number) => dispatch(removeTag(id))
    const dispatchedRemoveNotes = (id: number) => dispatch(removeNotes(id))
    const dispatchedFilterChange = (filter: string) => dispatch(changeFilter(filter))
    const dispatchedCompleteNotes = (id: number) => dispatch(completeNotes(id))

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getTags());
      }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;

        setTagsText(splitTags(value))
        setNotesText(value)  
    }

    const handleAddTask = () => { 
        if(tagsText.length !== 0){
            const newTags = addNewTags(tags, tagsText);

            newTags.forEach(({ id, text }) => {
                dispatchedAddTag({ id: id, text: text });
                postTags({ id: id, text: text });
            })
            
            let updateTags: ITag[] = [...(tags as ITag[])];
            newTags.forEach((item) => {
                updateTags.push(item)
            }) 

            const tagsNotes = getTagNotes(updateTags, tagsText)

            dispatchedAddNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tags: tagsNotes });
            postNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tags: tagsNotes })
            
        } else {
            dispatchedAddNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tags: [] });
            postNotes({ id: (new Date()).getTime(), text: notesText, isCompleted: false, tags: [] });
        }
        setNotesText('');
        setTagsText([])
    }

    const isTasksExist = useMemo(() => notes && (notes as INotes[]).length > 0, [notes]);

    const filterTasks = useCallback((tasks: INotes[]) => {
        if(filter !== 'all'){
            return tasks.filter(item => item.text.includes(`#${filter}`))
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
            {isLoading ? 
                <Loader /> : 
                <NotesItemsList 
                    tasksList={filteredTasks} 
                    updateNotes={dispatchedUpdateNotes} 
                    removeNotes={dispatchedRemoveNotes} 
                    removeTag={dispatchedRemoveTag}
                    completeNotes={dispatchedCompleteNotes}
                />
            }
            {isTasksExist && <Footer amount={(notes as INotes[]).length} activeFilter={filter} filterChange={dispatchedFilterChange}/>}
        </div>
    )
}
