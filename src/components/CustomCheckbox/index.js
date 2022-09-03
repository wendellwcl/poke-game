import { useEffect, useState } from 'react';

const CustomCheckbox = ({ generation }) => {
    const { name, isChecked } = generation;

    const [checked, setChecked] = useState(isChecked);
    const [text, setText] = useState(name);

    useEffect(() => {
        const index = name.search('-');
        const uppercase = name.slice(index + 1).toUpperCase();
        const handledName = name.slice(0, index + 1) + uppercase;

        setText(handledName);
    }, [name]);

    function toggleChecked() {
        generation.isChecked = !checked;
        setChecked((prev) => !prev);
    }

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
                defaultChecked={checked}
                name={name}
                onChange={toggleChecked}
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
