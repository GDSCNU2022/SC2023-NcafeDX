import { useState } from "react";
import ModalNewsPanel from "./ModalNewsPanel";
import Modal from "react-modal";
import handler from "@src/pages/api/hello";
import SubmitStarRating from "./SubmitStarRating";
import { auth, db } from "@src/firebase/client";
import firebase from 'firebase/app';
import { getUser } from '@src/pages/api/get-user';

type Props = {
  restaurant: string;
  menuName: string;
  id: string;
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(50,50,50, 0.8)",
    zIndex: 1000,
    overflow: "auto",
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
  const [isRated, setIsRated] = useState(false);

  const openModal = () => {
    // ログイン状態を確認
    auth.onAuthStateChanged(async (user) => {

      if (user) {
        user.getIdTokenResult(true).then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setIsCheckIn(() => false);
            console.log(" You are an administrator.")
          } else {
            setCurrentUser(user);
            setIsCheckIn(() => true);
            isRegisterSubmitStarRatings(user.uid, props.id)
          }
        }) 
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

  // TODO: ユーザーの評価履歴にメニューIDを登録
  const isRegisterSubmitStarRatings = (userID, menuID) => {
    console.trace("isRegisterSubmitRatings called")
    console.log(`uid: ${userID}, mid: ${menuID}`);
        if(userID && menuID) {
          getUser(db, userID).then((d) => {
            console.log(d);
            if(d.registeredRatingMenuID){
              if(d.registeredRatingMenuID.includes(menuID)) {
                  setIsRated(() => true);
                  console.log(`isRated: ${isRated}`)
              } else { console.log("user has not submitted star ratings yet.")}
            } else { console.log("user does not have registeredRatingMenuID.")
          }
          })
        } else {
          console.log("userID or menuID are undefined")
        }
      
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
          { 
          isRated ?
            <div className="flex justify-center">
            <p>既に評価済みです</p>
            </div>
          :
          isCheckIn ?
            <SubmitStarRating
            parentCloseHandler={closeModal}
            restaurant={props.restaurant}
            menuName={props.menuName}
            id={props.id}
            userID={currentUser.uid}
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
