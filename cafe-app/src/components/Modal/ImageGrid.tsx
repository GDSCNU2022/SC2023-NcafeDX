import {useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getAllImages } from '../../pages/api/get-image';
import Image from 'next/image';

type Props = {
    parentHandler: Dispatch<SetStateAction<string>>
    srcList: string[];
    setSrcList: any;
}

const ImageGrid = (props: Props) => {

    useEffect(() => {
        getAllImages(props.setSrcList).then(() => console.log(props.srcList)).catch((err) => console.log(`Error: ${err}`));
        console.log(props.srcList);

    }, [])

    return (
        <div className="h-full">
        <div className="grid grid-cols-4 gap-2 rounded-md shadow-md bg-slate-600 overflow-auto h-96">
        {props.srcList?.map((url: string, i) => (
            <button className="m-0.5 p-2 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2 w-32"
                    onClick={() => props.parentHandler(() => url)} key={i}>
                <div className="relative md:aspect-square">
                <Image src={url} fill object-fit="contain" alt="画像URLがありません"
                className="bg-slate-600 rounded-md shadow-md bg-clip-padding"/>
                </div>
            </button>
        ))
        }
        </div>
        </div>
    )
};

export default ImageGrid;