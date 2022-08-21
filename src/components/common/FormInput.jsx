import React from "react";

function FormInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
}) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="outline-none border border-gray-700 rounded-sm px-2 py-1 w-full"
            />
        </div>
    );
}

export default FormInput;
