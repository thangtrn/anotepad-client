import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "../components/common/Button";
import { fetchAuthLogin } from "../redux/auth/authActions";
import FormInput from "../components/common/FormInput";

function Register() {
    const dispatch = useDispatch();
    const { auth, error, loading } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = inputValues;
        dispatch(
            fetchAuthLogin({
                email,
                password,
            })
        );
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (auth) {
            toast.success("Login success");
            navigate("/");
        }
    }, [auth, error, navigate, dispatch]);
    return (
        <div className="container mx-auto h-full flex items-center flex-col">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-96 mt-20"
            >
                <h3 className="text-2xl font-extrabold text-center">
                    Login form
                </h3>
                <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={inputValues.email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={inputValues.password}
                    onChange={handleChange}
                    type="password"
                />
                <Button
                    disabled={loading ? true : false}
                    className="py-2"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <Link
                to="/forgot_password"
                className="mt-2 w-96 text-right underline text-sm"
            >
                Forgot password?
            </Link>
        </div>
    );
}

export default Register;
