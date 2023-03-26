import {useState} from 'react';
import {useForm} from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../firebase/client';

type Props = {
    setValue?: Function;
    onClick?: Function;
}

const UploadImageForm = (props: Props) => {

    const [image, setImage] = useState();
    const handleChange = (e: any) => {
        setImage(e.target.files[0]);
    }

    const imageUpload = (file: any): void => {
        console.log("call in imageUpload");
        try {
            const imageRef = ref(storage, `images/${file.name}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                console.log("Uploaded a file.");
                console.log(snapshot);
            
            getDownloadURL(imageRef).then((url: string) => {
                if(url && props.setValue){ props.setValue('imageURL', url);
                } else if (props.setValue){ props.setValue('imageURL', "");}
                console.log("upload data URL");
                console.log(url);
            
            if(props.onClick && url) {
                props.onClick(url);
            }
        });
            }).catch((err) => console.log(err));

            }
        catch(err) {
            console.log(err);
        }

    }

    return (
        <div className="inline-block w-64">
            <input className="align-middle m-1" type="file" onChange={handleChange}/>
            <button className="bg-slate-400 shadow-sm rounded-sm m-1 px-2 py-1 text-white"
                onClick={() => imageUpload(image)}>Upload</button>
            </div>
    )
}

export default UploadImageForm;