import { FC, ReactNode, cloneElement, useState } from 'react';
import Modal from 'react-modal';

type Props = {
    close: Function;
    children: ReactNode;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ModalView = (props: Props) => {

return (
    <>
    <div onClick={() => props.close} className="flex justify-center w-128">
        <div>
            {cloneElement(props.children as any, {close: props.close})}
            </div>
    </div>
    </>

)
}
export default ModalView;