import ImageGrid from './ImageGrid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import UploadImageForm from './UploadImageForm';
import { Literata } from 'next/font/google';
import { deleteImagesWithURL } from '../pages/api/get-image';
type Props = {
    close?: (e: any) => void;
}

const Panel = (props: Props) => {
    const [selectedUrl, setSelectedUrl] = useState<string>('');
    const [imgSrcList, setImgSrcList] = useState<string[]>([]);

    const submit = (e: any) => {
        e.preventDefault();

        // ...process
        console.log("Panel Opened");

        if(props.close) {
            props.close(e);
        };
    };

    const handleDelete = () => {
        setImgSrcList((list: any) => list.filter((url: string) => url !== selectedUrl));
        deleteImagesWithURL(selectedUrl);
    };

    return (
        <>
        <div className="bg-gray-300 p-2 rounded-md">
            <ImageGrid parentHandler={setSelectedUrl} srcList={imgSrcList} setSrcList={setImgSrcList}/>
        <div className="flex justify-bottom">
            <UploadImageForm/>
        </div>
            <button className="p-2 m-1 bg-slate-600 align-middle h-10 shadow-md rounded-md"
            type='button' onClick={props.close}>Cancel</button>
            <button className="p-2 m-1 bg-slate-600 align-middle h-10 shadow-md rounded-md"
            type='button' onClick={handleDelete}>Delete</button>

        </div>
        </>

    );
};
export default Panel;