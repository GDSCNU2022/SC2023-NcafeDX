import { useState } from 'react';
import Modal from './Modal';
import Panel from './ModalPanel';

const ModalImageGrid =  (props: any) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const toggleModal = (e: any) => {
        if(e.target === e.currentTarget){
            setIsOpenModal(!isOpenModal);
        }
    };

    return (
<>
    <button type='button' onClick={toggleModal}>
        Modal Open
    </button>
    {isOpenModal && (
        <Modal close={toggleModal}>
            <Panel/>
            </Modal>
    )}
</>
    );
}
export default ModalImageGrid;