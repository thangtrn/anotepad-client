import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import validator from "../hooks/validator";
import Button from "../components/common/Button";
import FormInput from "../components/common/FormInput";
import { fetchAuthRegister } from "../redux/auth/authActions";

function Register() {
    const { loading } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        secret: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validator(formData);
        if (!isValidate) return;
        const userData = formData;
        dispatch(fetchAuthRegister({ userData, toast, navigate }));
    };
    return (
        <div className="container mx-auto h-full flex items-center flex-col">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-96 mt-20"
            >
                <h3 className="text-2xl font-extrabold text-center">
                    Register form
                </h3>
                <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <FormInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                />
                <FormInput
                    label="Confirm password"
                    name="confirmPassword"
                    placeholder="Enter your confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    type="password"
                />
                <div>
                    <label>Secret questions</label>
                    <select className="outline-none border border-gray-700 rounded-sm px-2 h-[34px] w-full">
                        <option>What's your favorite color?</option>
                        <option>What's your favorite animal?</option>
                        <option>What's your favorite movie?</option>
                        <option>What's your first car?</option>
                    </select>
                </div>
                <FormInput
                    label="Your answer"
                    name="secret"
                    placeholder="Enter your answer"
                    value={formData.secret}
                    onChange={handleChange}
                />
                <Button
                    disabled={loading ? true : false}
                    className="py-2 mt-3"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
            <Link to="/login" className="mt-2 w-96 text-right text-sm">
                Already have an account?{" "}
                <span className="underline">Login now.</span>
            </Link>
        </div>
    );
}

export default Register;
