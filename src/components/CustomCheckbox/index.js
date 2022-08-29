import { useEffect, useState } from 'react';

import './CustomCheckbox.css';

const CustomCheckbox = ({ name }) => {
    const [text, setText] = useState(name);

    useEffect(() => {
        const index = name.search('-');
        const uppercase = name.slice(index + 1).toUpperCase();
        const handledName = name.slice(0, index + 1) + uppercase;

        setText(handledName);
    }, [name]);

    return (
        <label
            className="custom-checkbox-label"
            htmlFor={`${name}`}
            tabIndex="1"
        >
            <input
                type="checkbox"
                className="custom-checkbox"
                id={name}
            />
            <span className="custom-checkbox-text">{text}</span>
            <div
                className="custom-checkbox-box"
                tabIndex="1"
            ></div>
        </label>
    );
};

export default CustomCheckbox;
