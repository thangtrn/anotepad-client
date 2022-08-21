import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "../components/common/Button";
import { forgotPassword } from "../redux/auth/authActions";
import FormInput from "../components/common/FormInput";

function ForgotPassword() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        secret: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, secret, password } = formData;
        if (!email || !password || !secret) return;
        const userData = formData;
        dispatch(forgotPassword({ userData, toast, navigate }));
    };

    return (
        <div className="container mx-auto h-full flex items-center flex-col">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-96 mt-20"
            >
                <h3 className="text-2xl font-extrabold text-center">
                    Fotgot password
                </h3>
                <FormInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    label="Secret answer"
                    name="secret"
                    placeholder="Enter your secret answer"
                    value={formData.secret}
                    onChange={handleChange}
                />
                <FormInput
                    label="New password"
                    name="password"
                    placeholder="Enter your new password"
                    value={formData.password}
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
        </div>
    );
}

export default ForgotPassword;
