import { useState } from 'react';
import ModalNewsPanel from './ModalNewsPanel';
import Modal from 'react-modal';
import handler from '@/pages/api/hello';
import SubmitStarRating from './SubmitStarRating';

type Props = {
    restaurant: string;
    menuName: string;
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
    background: 'white',
    },
};

const ModalStarWindow = (props: Props) => {
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
        >Review</button>
        <Modal
            isOpen={isOpenModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='News Form'>
            <div className="w-40">
                <SubmitStarRating parentCloseHandler={closeModal} restaurant={props.restaurant} menuName={props.menuName}/>
            </div>

        </Modal>
        </>
    );
};
export default ModalStarWindow;