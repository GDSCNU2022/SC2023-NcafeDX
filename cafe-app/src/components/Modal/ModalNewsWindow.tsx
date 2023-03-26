import { useState } from 'react';
import ModalNewsPanel from './ModalNewsPanel';
import Modal from 'react-modal';
import handler from '@/pages/api/hello';

type Props = {
    restaurant: string;
    data: any;
    parentHandlerSubmit: Function;
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

const ModalNewsWindow = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    
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
        <button onClick={openModal} 
        className="px-2 bg-slate-600 align-middle
        h-6 shadow-md rounded-md text-white"
        >Edit</button>
        <Modal
            isOpen={isOpenModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='News Form'>
            <div className="w-96">
                <ModalNewsPanel parentHandlerSubmit={props.parentHandlerSubmit} restaurant={props.restaurant} data={props.data} close={closeModal}/>
            </div>

        </Modal>



        </>
    );
};
export default ModalNewsWindow;