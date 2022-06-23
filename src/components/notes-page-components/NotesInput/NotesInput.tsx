import React from 'react';

interface INotesInput {
    onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    addNotes: () => void,
}

export const NotesInput = ({ value, onChange, addNotes }: INotesInput) => {
    return (
        <div className="notes-input-wrapper">
            <input
                className="notes-input"
                placeholder="Click plus to add notes"
                onChange={onChange}
                value={value}
            />
            <i className="fas fa-plus" onClick={addNotes}/>
        </div>
    )
}