import React, { Dispatch, SetStateAction, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { CheckKeyConstraint } from 'react-hook-form/dist/types/path/common';
import InputCheckboxChild from './InputCheckboxChild';

export type CheckboxProps = {
    props: [Dispatch<SetStateAction<any>>, any, any, any, number];
}

const InputCheckbox = forwardRef((props: CheckboxProps, ref: any) => {

    const setCheckedData = props.props[0];
    const docQuery = props.props[1];
    const inputCheckedList = props.props[2];
    const setInputCheckedList = props.props[3];
    const index = props.props[4];

    const handleChange = (checked: boolean) => {
        console.log(inputCheckedList);
        console.log(index);
        if (checked){
            setCheckedData((list: Array<any>) => {
                console.log(list ? [...list, docQuery] : [docQuery]);
                return list ? [...list, docQuery] : [docQuery]}
                );
        } else { 
            setCheckedData ((list: Array<any>) => {
                console.log(list)
                list ? list.filter((id) => id !== docQuery) : [];
                
        });}
        inputCheckedList[index] = checked;
    }

    return (
        <div className="flex justify-center">
            <InputCheckboxChild
            checked={inputCheckedList[index]}
            handleChange={(e) => handleChange(e.target.checked)}/>
        </div>
    )
}
)

export default InputCheckbox;