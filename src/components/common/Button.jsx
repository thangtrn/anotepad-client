import React from "react";
import { Link } from "react-router-dom";

function Button({ to, href, onClick, children, className, disabled = false }) {
    let Comp = "button";
    const props = {
        onClick,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }
    return (
        <Comp
            {...props}
            disabled={disabled}
            className={`border border-gray-400 text-[#333] font-bold hover:border-transparent hover:text-[#fff] text-base px-3 py-1 rounded-sm hover:bg-[#fe2c55] transition-colors ${className}`}
        >
            {children}
        </Comp>
    );
}

export default Button;
