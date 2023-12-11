import { useState } from "react";
import ModalUserNewsPanel from "./ModalUserNewsPanel";
import Modal from "react-modal";

type Props = {
  restaurant: string;
  data: any;
  parentHandlerSubmit: Function;
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(50,50,50, 0.8)",
    zIndex: 100,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(50,50,50, 0.0)",
    border: "none",
    width: "100%",
  },
};

const ModalUserNewsWindow = (props: Props) => {
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
      <button
        onClick={openModal}
        className="mt-2 px-1 text-xs bg-slate-300 align-middle
        h-6 mb-1 shadow-md rounded-md text-gray-900"
      >
        詳細
      </button>
      <Modal
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="bg-white w-full shadow-lg rounded-lg">
          <ModalUserNewsPanel
            parentHandlerSubmit={props.parentHandlerSubmit}
            restaurant={props.restaurant}
            data={props.data}
            close={closeModal}
          />
        </div>
      </Modal>
    </>
  );
};
export default ModalUserNewsWindow;
