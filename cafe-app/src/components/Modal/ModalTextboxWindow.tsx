import { useState } from "react";
import { db } from "../../firebase/client";
import ModalTextboxPanel from "./ModalTextboxPanel";
import Modal, { setAppElement } from "react-modal";
import { is } from "date-fns/locale";
import { SubmitHandler, Field } from "react-hook-form";

type Props = {
    parentObj?: any;
    restaurant: string;
    targetId: string;
    handleSubmit: any;
    index: number;
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

const ModalTextboxWindow = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);


    const handlerSubmit = () => {
      closeModal()
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
<div>
  <button onClick={openModal} 
    className="outline w-16 bg-neutral-400 outline-1 hover:outline-2 hover:shadow-md  hover:outline-slate-600 hover:outline-offset-none">
  Edit</button>
        <Modal
            isOpen={isOpenModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Text'>
            <ModalTextboxPanel
            parentObj={props.parentObj}
            restaurant={props.restaurant}
            targetId={props.targetId}
            close={closeModal}
            index={props.index}
            parentHandlerSubmit={props.handleSubmit}
            />
            </Modal>
</div> 
    );
}
export default ModalTextboxWindow;
