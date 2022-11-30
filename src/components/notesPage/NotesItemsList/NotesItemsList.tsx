import React from "react";
import { ICountTag, INotes, ITagNotes } from "../../../interfaces/interfaces";
import { NotesItem } from "../NotesItem/NotesItem";

interface INotesItemsList {
    tasksList: INotes[];
    updateNotes: (id: number, text: string, tags: ITagNotes[]) => void;
    removeNotes: (id: number) => void;
    completeNotes: (id: number) => void
}

export const NotesItemsList = ({ tasksList, updateNotes, removeNotes, completeNotes }: INotesItemsList) => {
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
                    completeNotes={completeNotes}
                />
            ))}
        </ul>
    )
}