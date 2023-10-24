import { useState, useEffect } from "react";
import { db } from "../../firebase/client";
import { getMenu, MenuProps } from "../../pages/api/get-menu";
import Modal from "react-modal";
import MenuStarRatings from "../Examples/MenuStarRatings";
import ModalStarWindow from "./ModalStarWindow";
import NutritionCard from "../User/NutritionCard";

type Props = {
  restaurant: string;
  name: string;
  id: string;
};

function cafecolor(prop: string) {
  let bgcolor = "bg-red-500";
  if (prop === "Pascal") {
    bgcolor = "bg-red-500";
  } else if (prop === "DaVinch") {
    bgcolor = "bg-green-500";
  } else {
  }
  return bgcolor;
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
    background: "white",
  },
};

const ModalMenuInfo = (props: Props) => {
  const initMenu = {
    name: "",
    id: "",
    price: 999,
    category: "don",
    stars: 0,
    starStorage: [0],
    imageURL: "",
    nutrition: {
      kcal: 0,
      P: 0,
      F: 0,
      C: 0,
    },
  };
  const path = props.restaurant + "/" + props.name;
  const [menu, setMenus] = useState<MenuProps>(initMenu);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // ignite when mounted
  useEffect(() => {
    getMenu(db, path).then((value: any) => {
      setMenus(() => value);
    });
  }, []);
  let imageURL: string = menu.imageURL!;
  const stylecolor = cafecolor(props.restaurant);
  /*
    Usage:
    <ModalStarWindow restaurant={"RestaurantName"} menuName={TargetMenuName}>
    */

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
        className="text-white w-14 bg-orange-400 rounded-full hover:bg-gray-200 hover:text-gray-900 duration-300 mx-auto text-center"
      >
        <div className="inline-block mt-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z"
              fill="currentColor"
            />
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill="currentColor"
            />
            <path
              d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="bg-orange-300 p-2 rounded-md w-128">
        <div className="flex flex-shrink-0 items-center justify-end md:pt-0">
          <button
            type="button"
            className="box-content md:pt-15 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className={"m-auto w-96 my-auto max-w-screen-md"}>
          <section className="flex-col container mx-auto text-gray-900 border-gray-200 w-full">
            <div className="flex flex-wrap">
                <div className="bg-white rounded-t-lg">
                  <div className="flex justify-center content-border">
                    <div className="w-fit">
                      <img className="rounded-t-lg" src={imageURL} />
                    </div>
                  </div>
                  <div className="relative pt-2 px-2 md:pt-4">
                    <div className="items-center md:pt-4 mb-1">
                      <MenuStarRatings ratings={menu.stars ? menu.stars : 0} />
                      <h2 className="text-gray-900 text-md font-medium">
                        {menu.name}
                      </h2>
                      <h2 className="text-gray-900 text-3xl font-medium">
                        ¥{menu.price}
                      </h2>
                    </div>
                    <div className="absolute bottom-5 right-5 w-1/4 mx-auto">
                      <ModalStarWindow
                        restaurant={props.restaurant}
                        menuName={props.name}
                        id={props.id}
                      />
                    </div>
                  </div>
              </div>
            </div>
            <div className="container mx-auto pt-1">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="object-left-top bg-white rounded-b-lg shadow-lg pb-5">
                    <NutritionCard path={path} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalMenuInfo;
