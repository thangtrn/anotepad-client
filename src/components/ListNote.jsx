import React, { useEffect } from "react";
import ListNoteItem from "./ListNoteItem";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotesApi } from "../redux/note/noteActions";

function ListNote() {
    const { notes } = useSelector((state) => state.noteReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotesApi());
    }, [dispatch]);

    return (
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
            {notes.map((note) => (
                <ListNoteItem key={note._id} data={note} />
            ))}
        </div>
    );
}

export default ListNote;
