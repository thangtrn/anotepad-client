import React, { useState, useEffect, useRef } from "react";
import { GiNotebook } from "react-icons/gi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { deleteNote } from "../redux/note/noteActions";

function ListNoteItem({ data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id, title } = data;
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();

    const handleDelete = () => {
        alert("Are you sure you want to delete this note?");
        dispatch(deleteNote({ _id, toast, navigate }));
    };

    useEffect(() => {
        const closeDropdown = (e) => {
            if (e.path[1] !== btnRef.current) {
                setIsOpen(false);
            }
        };
        document.body.addEventListener("click", closeDropdown);

        return () => {
            document.body.removeEventListener("click", closeDropdown);
        };
    }, []);

    return (
        <div className="flex justify-start px-4 py-2 relative">
            <GiNotebook size={24} />
            <Link
                to={`/note/${_id}`}
                className="flex-1 mx-1 truncate hover:text-red-500 transition-all ease-in-out duration-300"
            >
                {title}
            </Link>
            <button
                ref={btnRef}
                onClick={() => setIsOpen(!isOpen)}
                className="hover:bg-gray-300/80 rounded-sm px-1"
            >
                <BiDotsVerticalRounded />
            </button>
            <ul
                style={{ display: isOpen ? "block" : "none" }}
                className="absolute top-[80%] right-6 bg-white border border-[rgba(0,0,0,.15)] rounded py-1 shadow-md z-10"
            >
                <li>
                    <Link
                        to={`/note/${_id}`}
                        className="block text-sm px-5 py-1 rounded w-[158px] text-start hover:bg-[#d9d2c2] hover:text-[#cb4b16] transition-all"
                    >
                        Edit
                    </Link>
                </li>
                <li>
                    <button
                        onClick={handleDelete}
                        className="text-sm px-5 py-1 rounded w-[158px] text-start hover:bg-[#d9d2c2] hover:text-[#cb4b16] transition-all"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ListNoteItem;
