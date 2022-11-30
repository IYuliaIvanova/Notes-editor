import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, postNotes } from "../../../api/fetchRequest/fetchNotes";
import { postTags } from "../../../api/fetchRequest/fetchTags";
import { ICountTag, ITag, ITagNotes } from "../../../interfaces/interfaces";
import { addTag } from "../../../redux/actions/tagsActionCreators/actionCreators";
import { RootState } from "../../../redux/reducers";
import { addNewTags, countAllTagsNotes, getTagNotes, splitTags } from "../../../utils/tagsUtils";

interface INotesItem {
    text: string;
    isCompleted: boolean;
    id: number;
    updateNotes: (id: number, text: string, tags: ITagNotes[]) => void;
    removeNotes: (id: number) => void;
    completeNotes: (id: number) => void;
}

export const NotesItem = ({ text, isCompleted, id, updateNotes, removeNotes, completeNotes }: INotesItem) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text)
    const [tagInput, setTagInput] = useState<string[]>([]);

    const { notes } = useSelector((state: RootState) => state.notes);
    const { tags } = useSelector((state: RootState) => state.tags);

    const dispatch = useDispatch();
    const dispatchedAddTag = (tag: ITag) => dispatch(addTag({ id: tag.id, text: tag.text }))

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value)
        setTagInput(splitTags(e.target.value))
    }

    const handleUpdateNotes = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const newTags = addNewTags(tags, tagInput);

        newTags.forEach(({ id, text }) => {
            dispatchedAddTag({ id: id, text: text });
            postTags({ id: id, text: text });
        })

        let updateTags: ITag[] = [...(tags as ITag[])];
        newTags.forEach((item) => {
            updateTags.push(item)
        }) 
            
        const tagsNotes = getTagNotes(updateTags, tagInput)

        updateNotes(id, editText, tagsNotes);
        deleteNotes(id)
        postNotes({ id: id, text: editText, isCompleted: false, tags: tagsNotes })

        setIsEditing(false)
    }

    const handleRemoveNotes = (e: React.FormEvent<HTMLElement>) => {
        removeNotes(id);
        deleteNotes(id)
    }
    
    return (
        <li className="notes-item">
            {isEditing ? 
                <>
                    <input
                        className="edit-input"
                        placeholder="Click check to save notes"
                        onChange={handleEditInput}
                        value={editText}
                    />
                    <i className="fas fa-check" onClick={handleUpdateNotes}/>
                </>
            : 
                <>
                    <i className={isCompleted ? 'mark far fa-check-circle' : 'mark far fa-circle'} onClick={() => completeNotes(id)}/>
                    <span className={isCompleted ? 'completed text' : 'text'}>{editText}</span>
                    <div>
                        <i className="fas fa-edit" onClick={() => setIsEditing(true)}/>
                        <i className="fas fa-trash" onClick={handleRemoveNotes}/>
                    </div>
                </>
            }
        </li>
    )
}