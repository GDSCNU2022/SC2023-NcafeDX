import ModalImageGrid from '@src/components/Modal/ModalImageGrid'
import router from 'next/router'
import { useState, useEffect } from 'react'
import Modal, { setAppElement } from "react-modal";
import DisplayQR from './DisplayQR';

setAppElement("#__next")

export type CouponCardProps = {
  title: string
  couponCode: string
  duration: string
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
    background: "red",
  },
};

const CouponCard = (props: CouponCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const openModal = () => {
    setIsOpenModal((b) => {
      return true
      });
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpenModal((b) => {
      return false
    }
      );
  };

  return (
    <>
      <div className="content-center cursor-pointer">
        <div className="bg-gradient-to-br from-pink-400 to-red-300 hover:to-pink-400 text-white 
        text-center py-8 px-10 rounded-lg shadow-md relative" onClick={openModal}>
          <div className="w-32">
            <h3 className="text-lg font-semibold mb-4">
              {props.title}
            </h3>
            <p className="text-sm text-red-600">{props.duration}</p>
          </div>
            
      <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 left-0 -ml-6"></div>
      <div className="w-12 h-12 bg-white rounded-full absolute top-1/2 transform -translate-y-1/2 right-0 -mr-6"></div>

      </div>
      <Modal
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Coupon">
          <DisplayQR title={props.title} duration={props.duration} couponCode={`${props.couponCode}`} close={closeModal}/>
        </Modal>
    </div></>
  )
}

export default CouponCard