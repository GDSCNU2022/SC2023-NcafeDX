import {useState, useEffect, Dispatch, SetStateAction } from 'react';
import { getAllImages } from '../pages/api/get-image';
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
        <div>
        <div className="grid-cols-4 rounded-md shadow-md p-2 bg-slate-600">
        {props.srcList?.map((url: string) => (
            <button className="m-0.5 p-2 bg-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-offset-2"
                    onClick={() => props.parentHandler(() => url)}>
                <Image src={url} width={128} height={128} alt="No Image"
                className="bg-slate-600 rounded-md shadow-md"/>
            </button>
        ))
        }
        </div>
        </div>
    )
};

export default ImageGrid;