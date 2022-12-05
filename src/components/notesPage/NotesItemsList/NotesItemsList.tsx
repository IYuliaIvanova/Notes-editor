import React from "react";
import { INotes, ITagNotes } from "../../../interfaces/interfaces";
import { NotesItem } from "../NotesItem/NotesItem";

interface INotesItemsList {
    tasksList: INotes[];
    updateNotes: (id: number, text: string, tags: ITagNotes[]) => void;
    removeNotes: (id: number) => void;
    removeTag: (id: number) => void;
    completeNotes: (id: number) => void
}

export const NotesItemsList = ({ tasksList, updateNotes, removeNotes, removeTag, completeNotes }: INotesItemsList) => {
    return (
        <ul className="notes-list">
            {tasksList.map(({ id, text, isCompleted }) => (
                <NotesItem 
                    key={id} 
                    id={id} 
                    text={text} 
                    isCompleted={isCompleted} 
                    updateNotes={updateNotes} 
                    removeNotes={removeNotes} 
                    removeTag={removeTag}
                    completeNotes={completeNotes}
                />
            ))}
        </ul>
    )
}