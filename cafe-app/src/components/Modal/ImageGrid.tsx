import {useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getAllImages } from '../../pages/api/get-image';
import Image from 'next/image';

type Props = {
    parentHandler: Dispatch<SetStateAction<string>>
    srcList: string[];
    setSrcList: any;
}

const ImageGrid = (props: Props) => {

    const handlerOnClick = (url: string) => {
        console.log(url);
        props.parentHandler(() => url)
    };

    useEffect(() => {
        getAllImages(props.setSrcList).then(() => console.log(props.srcList)).catch((err) => console.log(`Error: ${err}`));
        console.log(props.srcList);

    }, [])

    return (
        <div className="h-full flex justify-around">
        <div className="p-1 grid grid-cols-3 sm:grid-cols-4 gap-2 rounded-md shadow-md bg-slate-600 overflow-auto h-96">
        {props.srcList?.map((url: string, i) => (
            <button className="m-0.5 p-2 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 w-24 sm:w-32 hover:bg-slate-800"
                    onClick={() => handlerOnClick(url)} key={i}>
                <div className="relative aspect-square flex justify-items-center">
                    <img src={url} alt="画像URLがありません"
                    className="bg-slate-600 rounded-md shadow-md bg-clip-padding object-cover p-1"/>
                </div>
            </button>
        ))
        }
        </div>
        </div>
    )
};

export default ImageGrid;