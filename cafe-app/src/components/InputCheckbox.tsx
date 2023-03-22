import React, { Dispatch, SetStateAction, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { CheckKeyConstraint } from 'react-hook-form/dist/types/path/common';
import InputCheckboxChild from './InputCheckboxChild';

export type CheckboxProps = {
    props: [Dispatch<SetStateAction<any>>, any, any, any, number];
}

const InputCheckbox = forwardRef((props: CheckboxProps, ref: any) => {

    const setCheckedData = props.props[0];
    const docID = props.props[1];
    const inputCheckedList = props.props[2];
    const setInputCheckedList = props.props[3];
    const index = props.props[4];

    const handleChange = (checked: boolean) => {
        if (checked){
            setCheckedData((list: Array<any>) => list ? [...list, docID] : [true]);
        } else { 
            setCheckedData ((list: Array<any>) => {
                list ? list.filter((id) => id !== docID) : [false];
        });}
        inputCheckedList[index] = checked;
    }

    useEffect(() => {
        setInputCheckedList((list: Array<boolean>) => [...list, false]);
    }, []);

    return (
        <div>
            <InputCheckboxChild
            checked={inputCheckedList[index]}
            handleChange={(e) => handleChange(e.target.checked)}/>
        </div>
    )
}
)

export default InputCheckbox;