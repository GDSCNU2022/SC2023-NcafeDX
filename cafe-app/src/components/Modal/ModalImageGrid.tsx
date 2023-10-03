import { useState } from "react";
import { db } from "../../firebase/client";
import Panel from "./ModalImagePanel";
import Modal, { setAppElement } from "react-modal";
import { is } from "date-fns/locale";

type Props = {

    parentHandlerSubmit?: Function;
    src?: string;
    text?: string;
    index?: number;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(50,50,50, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "gray",
  },
};

setAppElement("#__next");

const ModalImageGrid = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);


    const handlerSubmit = (url: string) => {
        console.log("called handlerSubmit in ModalImageGrid");
        console.log(props.index);
        // 0<number>が undefined扱いになるので注意
        if(props.parentHandlerSubmit && (props.index !== undefined)){
            console.log(url);
            console.log(props.index);
            props.parentHandlerSubmit(url, props.index);
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
    {props.src ? <button onClick={openModal} className="outline w-16 bg-neutral-400 outline-1 hover:outline-2 hover:shadow-md  hover:outline-slate-600 hover:outline-offset-none">
        <div className="relative aspect-square flex justify-center">
        <img src={props.src} className="p-0.5 object-cover"/>
        </div></button> : <button onClick={openModal} className={props.index !== undefined ?
        "px-1 h-6 text-center bg-slate-600 align-middle shadow-md rounded-md text-white m-1" 
        : "p-2 justify-start bg-slate-600 align-middle h-10 shadow-md rounded-md text-white m-4"}>
        {props.text}</button>}
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
