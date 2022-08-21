import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListNote from "../components/ListNote";
import { createNote } from "../redux/note/noteActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { auth } = useSelector((state) => state.authReducer);
    const { loading } = useSelector((state) => state.noteReducer);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const handleCreateNote = () => {
        const { title, content } = formData;
        if (!title.trim()) {
            toast.warning("Please enter your title.");
            return;
        }
        if (!content.trim) {
            toast.warning("Please enter your content.");
            return;
        }
        const noteData = { title, content, uid: auth?._id };
        dispatch(createNote({ noteData, navigate }));
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
                disabled={loading}
                style={loading ? { opacity: "0.6", cursor: "not-allowed" } : {}}
                onClick={handleCreateNote}
                className="border boder-[#2e6da4] text-[#fff] bg-[#337ab7] font-bold text-base px-3 py-1 rounded-md"
            >
                Save
            </button>
            {auth && <ListNote />}
        </div>
    );
}

export default Home;
