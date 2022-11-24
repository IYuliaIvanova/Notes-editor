import React from "react";
import { NotesList } from "../../containers/NotesList/NotesList";

export const NotesPage = () => {
    return (
        <>
            <h1 className="title">Notes</h1>
            <NotesList/>
        </>
    )
}