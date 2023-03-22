import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import { CheckKeyConstraint } from 'react-hook-form/dist/types/path/common';
import InputCheckboxChild from './InputCheckboxChild';

export type CheckboxProps = {
    props: [any, Dispatch<SetStateAction<any>>, any];
}

const InputCheckbox = (props: CheckboxProps) => {
    // const [checkedData, setCheckedData] = useState(false);
    const [inputChecked, setInputChecked] = useState(false);
    const checkedData = props.props[0];
    const setCheckedData = props.props[1];
    const docID = props.props[2];

    const handleChange = (checked: boolean) => {
        if (checked){
            setInputChecked(checked);
            setCheckedData((list: Array<any>) => [...list, docID]);
        } else { 
            setInputChecked(checked);
            setCheckedData ((list: Array<any>) => {
                const newArray = list.filter( id => id !== docID)
                return newArray;
        });}
    }

    return (
        <div>
            <InputCheckboxChild
            checked={inputChecked}
            handleChange={(e) => handleChange(e.target.checked)}/>
        </div>
    )
}

export default InputCheckbox;