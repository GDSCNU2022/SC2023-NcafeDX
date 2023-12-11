import { useState, useEffect } from "react";
import { db } from "../../firebase/client";
import { getMenu, MenuProps } from "../../pages/api/get-menu";
import Modal from "react-modal";
import MenuStarRatings from "../Examples/MenuStarRatings";
import ModalStarWindow from "./ModalStarWindow";
import NutritionCard from "../User/NutritionCard";
import AllergicTable from "../User/MenuCards/AllergicTable";
import GFormSubmitButton from "../Utils/GFormSubmitButton";
import { MaterialSymbol } from "../Utils/MaterialSymbols";
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type Props = {
  restaurant: string;
  name: string;
  id: string;
  formURL: string;
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
    zIndex: 100,
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
    width: "auto",
    height: "90%"
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
    text:""
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
    console.log("Modal being opened");
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpenModal(() => false);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={openModal}
        className="text-white w-14 bg-orange-400 rounded-full hover:bg-gray-200 hover:text-gray-900 duration-300 text-center"
      >
      <MoreHorizIcon/>
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="bg-orange-300 p-2 rounded-md sm:w-96">
        <div className="flex flex-shrink-0 items-center justify-end md:pt-0">
          <button
            type="button"
            className="box-content md:pt-15 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss
            onClick={closeModal}
          >
          </button>
        </div>

        <div className="">
          <span className="flex justify-end w-full">
            <button className="border rounded bg-gray-50 mb-2" onClick={closeModal}>
              <CloseIcon/>
            </button>
          </span>
          <section className="text-gray-900 border-gray-200">
            <div className="flex justify-center">
                <div className="bg-white rounded-t-lg">
                  <div className="">
                    <div className="">
                      <img className="rounded-t-lg" src={imageURL} />
                    </div>
                  </div>
                  <div className="pt-2 px-2 md:pt-4">
                    <div className="mb-1 grid">
                      <MenuStarRatings ratings={menu.stars ? menu.stars : 0} />
                      <h2 className="justify-start text-gray-900 text-md font-medium">
                        {menu.name}
                      </h2>
                      <h2 className="justify-start text-gray-900 text-3xl font-medium">
                        ¥{menu.price}
                      </h2>
                      <h2 className="p-2 pt-4 flex justify-center">
                        <AllergicTable value={menu.allergens}/>
                      </h2>
                    </div>
                    <div className="pb-4 place-content-end flex justify-end">
                      <ModalStarWindow
                        restaurant={props.restaurant}
                        menuName={props.name}
                        id={props.id}
                      />
                    </div>
                    <div className="pb-4 place-content-end flex justify-end bg-gray">
                      <GFormSubmitButton formURL={props.formURL}/>
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
    </div>
  );
};
export default ModalMenuInfo;
