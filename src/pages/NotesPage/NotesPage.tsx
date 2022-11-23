import React from "react";
import { Title } from "../../components/common-components/Title/Title";
import { NotesList } from "../../containers/NotesList/NotesList";

export const NotesPage = () => {
    return (
        <>
            <Title children="Notes"/>
            <NotesList/>
        </>
    )
}