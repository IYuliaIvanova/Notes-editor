import React, { useState, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, postNotes } from "../../../api/fetchRequest/fetchNotes";
import { deleteTags, postTags } from "../../../api/fetchRequest/fetchTags";
import { INotes, ITag, ITagNotes } from "../../../interfaces/interfaces";
import { addTag } from "../../../redux/actions/tagsActionCreators/actionCreators";
import { RootState } from "../../../redux/reducers";
import { addNewTags, countAllTagsNotes, diff, getTagNotes, splitTags } from "../../../utils/tagsUtils";

interface INotesItem {
    text: string;
    isCompleted: boolean;
    id: number;
    updateNotes: (id: number, text: string, tags: ITagNotes[]) => void;
    removeNotes: (id: number) => void;
    removeTag: (id: number) => void;
    completeNotes: (id: number) => void;
}

export const NotesItem = ({ text, isCompleted, id, updateNotes, removeNotes, removeTag, completeNotes }: INotesItem) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text)
    const [tagInput, setTagInput] = useState<string[]>([]);
    const [tagNotes, setTagNotes] = useState<string[]>([]);

    const { notes } = useSelector((state: RootState) => state.notes);
    const { tags } = useSelector((state: RootState) => state.tags);

    const dispatch = useDispatch();
    const dispatchedAddTag = (tag: ITag) => dispatch(addTag({ id: tag.id, text: tag.text }))

    const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(splitTags(e.target.value))
        setEditText(e.target.value)
    }

    const handleEditButton = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        setTagInput(splitTags(editText))
        setTagNotes(splitTags(editText))
        setIsEditing(true)
    }

    const handleUpdateNotes = () => {
        const countTagsNotes = countAllTagsNotes(notes, tags)
        const diffTags = diff(tagInput, tagNotes)

        countTagsNotes.forEach((item) => {
            diffTags.forEach((tag) => {
                if(tag === item.tag && item.count === 1){
                    removeTag(item.id);
                    deleteTags(item.id)
                } 
            });
        });

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

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleUpdateNotes()
        }
    }

    const handleRemoveNotes = (e: React.FormEvent<HTMLElement>) => {
        const countTagsNotes = countAllTagsNotes(notes, tags)
        const inputTags: ITag[] = [];

        (notes as INotes[]).forEach(item => {
            if(id === item.id){
                item.tags.forEach(tag => inputTags.push(tag.tag))
            }
        });

        countTagsNotes.forEach((item) => {
            inputTags.forEach((tag) => {
                if(tag.text === item.tag && item.count === 1){
                    removeTag(item.id);
                    deleteTags(item.id)
                } 
            });
        });

        deleteNotes(id);
        removeNotes(id);
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
                        onKeyPress={handleKeyDown}
                    />
                    <i className="fas fa-check" onClick={handleUpdateNotes}/>
                </>
            : 
                <>
                    <i className={isCompleted ? 'mark far fa-check-circle' : 'mark far fa-circle'} onClick={() => completeNotes(id)}/>
                    <span className={isCompleted ? 'completed text' : 'text'}>{editText}</span>
                    <div>
                        <i className="fas fa-edit" onClick={handleEditButton}/>
                        <i className="fas fa-trash" onClick={handleRemoveNotes}/>
                    </div>
                </>
            }
        </li>
    )
}