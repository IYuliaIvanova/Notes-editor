import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, postNotes } from "../../../api/fetchRequest/fetchNotes";
import { postTags } from "../../../api/fetchRequest/fetchTags";
import { ITag } from "../../../interfaces/interfaces";
import { addTag } from "../../../redux/actions/tagsActionCreators/actionCreators";
import { tagsSelector } from "../../../redux/selectors/tagsSelectors/tagsSelectors";
import { getTags } from "../../../utils/tagsUtils";

interface INotesItem {
    text: string;
    isCompleted: boolean;
    id: number;
    updateNotes: (id: number, text: string, tags: string) => void;
    removeNotes: (id: number) => void;
    completeNotes: (id: number) => void;
}

export const NotesItem = ({ text, isCompleted, id, updateNotes, removeNotes, completeNotes }: INotesItem) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text)
    const [tagInput, setTagInput] = useState<ITag[]>([]);

    const { tags } = useSelector(tagsSelector);

    const dispatch = useDispatch();
    const dispatchedAddTag = useCallback(
        (tag: ITag) => dispatch(addTag({ id: tag.id, textTags: tag.textTags })),
        [dispatch]
    );

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value)
        setTagInput(getTags(e.target.value))
    }

    const handleUpdateNotes = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        const tagsTextInput = tagInput.map(({id, textTags},i) => {
            return textTags
        });
    
        const tagSet = new Set<string>([]);
        const unicTagsInput = [...tagsTextInput];

        (tags as ITag[]).forEach((item) => {
            for (let i = 0; i < unicTagsInput.length; i++) {
                const tag = unicTagsInput[i];

                if(item.textTags !== tag){
                    tagSet.add(tag)
                } else {
                    unicTagsInput.splice(i,1)
                    tagSet.delete(tag) 
                }
            }
        })

        if(tagSet.size !== 0){
            for (let i = 0; i < Array.from(tagSet).length; i++) {
                dispatchedAddTag({ id: (new Date()).getTime(), textTags: Array.from(tagSet)[i]})
                postTags({ id: (new Date()).getTime(), textTags: Array.from(tagSet)[i]})
            }
        }
        
        updateNotes(id, editText, tagsTextInput.join(' '));
        deleteNotes(id)
        postNotes({id: id, text: editText, isCompleted: false, tagsTextTask: tagsTextInput.join(' ')})

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