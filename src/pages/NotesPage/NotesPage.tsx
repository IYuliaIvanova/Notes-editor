import React, { Fragment } from "react";
import { Title } from "../../components/common-components/Title/Title";
import { NotesList } from "../../containers/NotesList/NotesList";

export const NotesPage = () => {
    return (
        <Fragment>
            <Title children="Notes"/>
            <NotesList/>
        </Fragment>
    )
}