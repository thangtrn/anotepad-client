import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import ListNote from "../components/ListNote";
import { getNote, editNote } from "../redux/note/noteActions";

function Note() {
    const { auth } = useSelector((state) => state.authReducer);
    const { loading } = useSelector((state) => state.noteReducer);
    const params = useParams();
    const disPatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    useEffect(() => {
        disPatch(getNote({ id: params.id, toast, setFormData }));
    }, [params, setFormData, disPatch]);

    const handleEdit = () => {
        const { title, content } = formData;
        if (!title.trim()) {
            toast.warning("Please enter your title.");
            return;
        }
        if (!content.trim) {
            toast.warning("Please enter your content.");
            return;
        }
        disPatch(editNote({ id: params.id, formData, toast }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-6xl px-3 mx-auto">
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                type="text"
                placeholder="Note title"
                className="mt-8 outline-none border border-[#d9d2c2] rounded-[4px] bg-[#fdf6e3] py-[6px] px-3 w-full max-w-[680px]"
            />
            <br />
            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Note content"
                className="mt-8 outline-none border border-[#d9d2c2] rounded-[4px] bg-[#fdf6e3] py-[6px] px-3 w-full h-[500px]"
            ></textarea>
            <br />
            <button
                disabled={loading || !auth}
                style={
                    loading || !auth
                        ? { opacity: "0.6", cursor: "not-allowed" }
                        : {}
                }
                onClick={handleEdit}
                className="border boder-[#2e6da4] text-[#fff] bg-[#337ab7] font-bold text-base px-3 py-1 rounded-md"
            >
                Save
            </button>
            {auth && <ListNote />}
        </div>
    );
}

export default Note;
