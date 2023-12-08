import { useState } from "react";
import ModalNewsPanel from "./ModalNewsPanel";
import Modal from "react-modal";
import handler from "@src/pages/api/hello";
import SubmitStarRating from "./SubmitStarRating";
import { auth } from "@src/firebase/client";
import firebase from 'firebase/app';

type Props = {
  restaurant: string;
  menuName: string;
  id: string;
  userID?: string;
};

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
    background: "white",
  },
};

const ModalStarWindow = (props: Props) => {
  /*
    Usage:
    <ModalStarWindow restaurant={"RestaurantName"} menuName={TargetMenuName}>
    */
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [isCheckIn, setIsCheckIn] = useState(false);

  const openModal = () => {
    // ログイン状態を確認
    auth.onAuthStateChanged( async (user) => {
      if (user) {
        setCurrentUser(user);
        setIsCheckIn(() => true);
      } else {
        setIsCheckIn(() => false);
      }
    })
    console.log(isCheckIn);
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
        className="px-4 pt-2 pb-2 text-align-center bg-slate-600 align-middle
        shadow-md rounded-md text-white"
      >
        評価する
      </button>
      <Modal
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="News Form"
      >
        <div className="w-40">
          { isCheckIn ?
          <SubmitStarRating
            parentCloseHandler={closeModal}
            restaurant={props.restaurant}
            menuName={props.menuName}
            id={props.id}
            userID={props.userID}
          />
        :
        <div className="flex justify-center">
          <p>ログインが必要です</p>
        </div>
        }
        </div>
      </Modal>
    </>
  );
};
export default ModalStarWindow;
