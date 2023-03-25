import { useState } from 'react';
import Panel from './ModalPanel';
import { useModal } from 'react-hooks-use-modal';

type Props = {
    parentHandlerSubmit?: Function;
}

const ModalImageGrid =  (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [Modal, open, close] = useModal('__next', {
        preventScroll: true
    });

    const handlerSubmit = (url: string) => {
        console.log("called handlerSubmit in ModalImageGrid");
        if(props.parentHandlerSubmit){
            props.parentHandlerSubmit(url);
        }
    };

    return (
<>
    <button type='button' onClick={open} className="p-2 justify-start m-4 bg-slate-600 align-middle h-10 shadow-md rounded-md">
        Register Menu Image
        <Modal>
            <Panel parentHandlerSubmit={handlerSubmit}/>
            </Modal>
        </button>
</>
    );
}
export default ModalImageGrid;