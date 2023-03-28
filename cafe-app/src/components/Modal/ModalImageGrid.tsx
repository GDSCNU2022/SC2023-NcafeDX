import { useState } from 'react';
import Panel from './ModalImagePanel';
import Modal, { setAppElement } from 'react-modal';
import { is } from 'date-fns/locale';

type Props = {
    parentHandlerSubmit?: Function;
    text: string;
    index?: number;
}
const customStyles = {
    overlay: {
        backgroundColor:'rgba(50,50,50, 0.8)'
    },
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'gray',
    },
};

setAppElement('#__next');

const ModalImageGrid =  (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handlerSubmit = (url: string, i?: number) => {
        console.log("called handlerSubmit in ModalImageGrid");
        if(props.parentHandlerSubmit && i){
            console.log(url);
            console.log(i);
            props.parentHandlerSubmit(url, i);
        } else if (props.parentHandlerSubmit) {
            props.parentHandlerSubmit(url);
        }
    };

    const openModal = () => {
        setIsOpenModal(() => true);
    };

    const afterOpenModal = () => {
        console.log(isOpenModal);
    // references are now sync'd and can be accessed.
    };

    const closeModal = () => {
        setIsOpenModal(() => false);
    };

    return (
<>
    <button onClick={openModal} className="p-2 justify-start m-4 bg-slate-600 align-middle
    h-10 shadow-md rounded-md text-white">
        {props.text}</button>
        <Modal
            isOpen={isOpenModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Menu Images'>
            <Panel parentHandlerSubmit={handlerSubmit} close={closeModal}/>
            </Modal>
</> 
    );
}
export default ModalImageGrid;