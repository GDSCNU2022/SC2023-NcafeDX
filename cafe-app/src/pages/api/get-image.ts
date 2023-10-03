import { useState } from 'react';
import { storage } from '../../firebase/client';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

export const getAllImages = async (setFunc: Function) => {
    const listRef = ref(storage, 'images');
    listAll(listRef).then((res) => {
        console.log(res);
        res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((url) => {
                console.log(url);
                setFunc((list: any) => [...list, url])
            });
        });
    }).catch((err) => console.log(`Error : ${err}`));
    };

export const deleteImagesWithURL = (url: string) => {
    const listRef = ref(storage, url);

    deleteObject(listRef).then(() => {
  // File deleted successfully
    console.log(`Delete ${listRef} succeeded!`);
}).catch((error) => {
  // Uh-oh, an error occurred!
    console.log(`Error: ${error}`);
});

};