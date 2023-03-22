import React, { useState } from 'react';

type InputProps = {
    checked: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCheckboxChild = ({checked, handleChange}: InputProps) => {
    const [checkedValues, setCheckedValues] = useState([]);

    return (
        <div>
            <input type="checkbox" onChange={(e) => handleChange(e)} checked={checked}></input>
        </div>
    )
}

export default InputCheckboxChild;