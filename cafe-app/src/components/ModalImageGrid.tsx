import { useState } from 'react';
import Modal from './Modal';
import Panel from './ModalPanel';

type Props = {
    parentHandlerSubmit?: Function;
}

const ModalImageGrid =  (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const toggleModal = (e: any) => {
        if(e.target === e.currentTarget){
            setIsOpenModal(!isOpenModal);
        }
    };

    const handlerSubmit = (url: string) => {
        console.log("called handlerSubmit in ModalImageGrid");
        if(props.parentHandlerSubmit){
            props.parentHandlerSubmit(url);
        }
    };

    return (
<>
    <button type='button' onClick={toggleModal} className="p-2 justify-start m-4 bg-slate-600 align-middle h-10 shadow-md rounded-md">
        Register Menu Image
    </button>
    {isOpenModal && (
        <Modal close={toggleModal}>
            <Panel parentHandlerSubmit={handlerSubmit}/>
            </Modal>
    )}
</>
    );
}
export default ModalImageGrid;