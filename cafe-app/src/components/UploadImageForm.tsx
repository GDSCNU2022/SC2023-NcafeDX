import {useState} from 'react';
import {useForm} from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/client';

type Props = {
    setValue: Function;
}

const UploadImageForm = (props: Props) => {

    const [image, setImage] = useState();
    const [uploadUrl, setUploadUrl] = useState('');
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
            }).catch((err) => console.log(err));
            getDownloadURL(imageRef).then((url: string) => {
                setUploadUrl(() => url);
                if(url){ props.setValue('imageURL', url);
                } else { props.setValue('imageURL', "");}
                console.log("upload data URL");
                console.log(url);
            });
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <div className="inline-block align-middle w-64 mx-auto">
            <input className="align-middle" type="file" onChange={handleChange}/>
            <button onClick={() => imageUpload(image)}>Upload</button>
            </div>
    )
}

export default UploadImageForm;