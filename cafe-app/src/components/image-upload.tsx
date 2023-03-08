import React, { useState, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase/client';
import { ref, TaskState,
    getDownloadURL,
    uploadBytesResumable } from 'firebase/storage'; 
import Image from 'next/image';
export type firebaseOnLoadProp = {
    bytesTransferred: number;
    totalBytes: number;
    state: TaskState;

};

const UploadImage: React.FC = () => {
    const [myFiles, setMyFiles] = useState<File[]>([]);
    const [clickable, setClickable] = useState(false);
    const [src, setSrc] = useState('');

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if(!acceptedFiles[0]) return;

        try{
            setMyFiles([...acceptedFiles]);
            setClickable(true);
            handlePreview(acceptedFiles);
        } catch (err) {
            alert(err);
            }
        },
    []);

    const onDropRejected = () => {
        alert('画像のみアップロードできます');
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected
    });

    const handleUpload = (acceptedImg: any) => {
        try{
            // upload process
            const imageRef = ref(storage, '/images/${myFiles[0].name}');
            const uploadTask: any = uploadBytesResumable(imageRef, acceptedImg);

            // uploadTask.on(ignite condition, ignite func, failed, succeed)
            uploadTask.on(
                'state_changed',
                function (snapshot: firebaseOnLoadProp) {
                    const progress: number = 
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case 'paused':
                            console.log("Upload is paused");
                            break;
                        case 'running':
                            console.log("Upload is running");
                            break;
                    }
                },
                function (error: any) {
                    // failed
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.error("アクセス許可がありません");
                            break;

                        case 'storage/canceled':
                            console.error("アップロードがキャンセルされました");
                            break;
                        
                        case "storage/unknown":
                            console.error("予期せぬエラーが発生しました");
                            break;
                    }
                },

                function () {
                    // succeed
                    try{
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then(function (downloadURL: string) {
                                console.log("ダウンロードしたURL" + downloadURL);
                                
                            });
                    } catch (error: any) {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                console.log("ファイルが存在しません");
                                break;
                            case 'storage/unauthorized':
                                console.log("アクセス許可がありません. 認証が必要です");
                                break;
                            case 'storage/canceled':
                                console.log("キャンセルされました");
                                break;
                            case 'storage/unknown':
                                console.log("予期せぬエラーが発生しました");
                                break;

                        }
                    }
                }
            )
        } catch (error) {
            console.log("Catch Error", error);
        }
    };

    const handlePreview = (files: any) => {
        if (files === null) {
            return;
        }
        const file = files[0];
        if (file === null) {
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSrc(reader.result as string);
        };
    };

    return (
        <div>
            <div className="w-4/5 px-4 py-2 mx-auto my-4 text-center rounded-md">
            <div
                className="bg-gray-400 border-2 border-gray-500 rounded-md"
                {...getRootProps()}
            >
                {/* この中をタップすれば画像を選択できる */}
                <input {...getInputProps()} />
                {myFiles.length === 0 ? (
                <p className="py-4">画像を選択またはドラッグ＆ドロップ(この文字をクリックするとウィンドウが開きます)</p>
                ) : (
                <div>
                    {myFiles.map((file: File) => (
                    <React.Fragment key={file.name}>
                        {src && <Image src={src} width={100} height={100} alt="menu-card${file.name}" />}
                    </React.Fragment>
                    ))}
                </div>
                )}
            </div>
            <button
                disabled={!clickable}
                type="submit"
                className="px-4 py-2 my-4 bg-gray-200 rounded-md"
                onClick={() => handleUpload(myFiles)}
            >
                UPLOAD
            </button>
            </div>
    </div>
    );
}

export default UploadImage;