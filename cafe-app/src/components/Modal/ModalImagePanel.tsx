import ImageGrid from './ImageGrid';
import { useState } from 'react';
import UploadImageForm from '../Form/UploadImageForm';
import { deleteImagesWithURL } from '../../pages/api/get-image';
type Props = {
    close?: () => void;
    parentHandlerSubmit?: Function;
}

const Panel = (props: Props) => {
    const [selectedUrl, setSelectedUrl] = useState<string>('');
    const [imgSrcList, setImgSrcList] = useState<string[]>([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // ...process
        if(props.parentHandlerSubmit && selectedUrl){
            props.parentHandlerSubmit(selectedUrl);
        }

        if(props.close) {
            props.close();
        };
    };

    const handleDelete = () => {
        if(selectedUrl){
            setImgSrcList((list: any) => list.filter((url: string) => url !== selectedUrl));
            deleteImagesWithURL(selectedUrl);
        }
    };

    const handlerImageForm = (url: string) => {
        if(url){
            setImgSrcList((list: any) => [...list, url]);
        }
    }

    const handlerClose = () => {
        if(props.close){
            props.close();
        }

    }

    return (
        <div>
            <div className="bg-gray-300 p-2 rounded-md w-128">
                <ImageGrid parentHandler={setSelectedUrl} srcList={imgSrcList} setSrcList={setImgSrcList}/>
                <div className="flex justify-start mt-2">
                    <UploadImageForm onClick={handlerImageForm}/>
                </div>
                <button className="p-2 m-1 bg-slate-600 align-middle h-10 shadow-md rounded-md text-white"
                type='button' onClick={handleSubmit}>OK</button>
                <button className="p-2 m-1 bg-slate-600 align-middle h-10 shadow-md rounded-md text-white"
                type='button' onClick={handleDelete}>Delete</button>
                <div className="flex flex-row-reverse">
                    <button className="p-2 m-1 bg-slate-600 align-middle h-10 shadow-md rounded-md text-white"
                    type='button' onClick={handlerClose}>Cancel</button>
                </div>


            </div>
        </div>

    );
};
export default Panel;