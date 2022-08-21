import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Button from "./common/Button";
import { logout } from "../redux/auth/authActions";
import Loading from "../components/Loading";

function Header() {
    const { auth, loading: authLoading } = useSelector(
        (state) => state.authReducer
    );
    const { loading: noteLoading } = useSelector((state) => state.noteReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout({ toast, navigate }));
    };

    return (
        <div className="w-full bg-[#d9d2c2] fixed inset-x-0 top-0 px-4 lg:px-0">
            {(authLoading || noteLoading) && <Loading />}
            <div className="h-14 container mx-auto flex items-center justify-between">
                <Link to="/" className="text-[#424242] text-2xl  font-bold">
                    aNotepad
                </Link>
                <div className="flex gap-3">
                    {!auth ? (
                        <>
                            <Button to="/login">Login</Button>
                            <Button to="/register">Register</Button>
                        </>
                    ) : (
                        <>
                            {/* <Button to="/setting">Setting</Button> */}
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
