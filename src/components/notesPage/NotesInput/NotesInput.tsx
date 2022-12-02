import React, { KeyboardEvent } from 'react';

interface INotesInput {
    onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    addNotes: () => void,
}

export const NotesInput = ({ value, onChange, addNotes }: INotesInput) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addNotes()
        }
    }
    return (
        <div className="notes-input-wrapper">
            <input
                className="notes-input"
                placeholder="Click plus to add notes"
                onChange={onChange}
                value={value}
                onKeyPress={handleKeyDown}
            />
            <i className="fas fa-plus" onClick={addNotes}/>
        </div>
    )
}