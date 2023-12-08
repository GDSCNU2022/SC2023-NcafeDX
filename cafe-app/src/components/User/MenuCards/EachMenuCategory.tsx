import { useState, useEffect } from "react";
import { db } from "@src/firebase/client";
import {
  categories,
  getAllMenus,
  RestaurantType,
} from "@src/pages/api/get-menu";
import MenuStarRatings from "@src/components/Examples/MenuStarRatings";
import ModalMenuInfo from "@src/components/Modal/ModalMenuInfo";
import ReactStarRatings from "@src/components/Examples/ReactStarRatings";
import { getGFormURLWithInitValue } from "@src/pages/api/getGFormUrl";
import AllergicTable from "./AllergicTable";
// Data Structure
// Collection{DaVinch}/Doc{Menu}/Collection{Teishoku, Noodle, Don}/Doc{MenuName}/Field{MenuProps}
// Users/
type Props = {
  restaurant: RestaurantType;
  category: string;
};

function cafecolor(prop: string) {
  let bgcolor = "bg-red-500";
  if (prop === "Pascal") {
    bgcolor = "bg-red-500";
  } else if (prop === "DaVinch") {
    bgcolor = "bg-orange-300";
  } else {
  }
  return bgcolor;
}

const EachMenuCategory = (props: Props) => {
  const [list, setList] = useState<Array<any>>([]);

  const updateList = (doc: any) => {
    const docData = doc.data();
    const newObj = {
      ...docData,
      id: doc.id,
    };
    setList((list) => {
      return [...list, newObj];
    });
  };

  const getGFormURL = (category: any, menuName: string) => {
    const _formURL = category 
                      &&
                      menuName ? getGFormURLWithInitValue(category, menuName) 
                      : 
                      "https://docs.google.com/forms/d/e/1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g/viewform";
    
    return _formURL;
  };

  // ignite when mounted
  useEffect(() => {
    // strictModeのせいでマウント時に2回レンダリングされる
    getAllMenus(db, updateList, props.restaurant);
    return () => {
      console.log("unmounting...");
      setList((list) => []);
    };
  }, []);
  const stylecolor = cafecolor(props.restaurant);
  return (
    <>
      <section className="text-gray-900 border-t border-gray-200">
            <>
              <div id="menu-card" className="container mx-auto">
                <div className="flex grid grid-cols-2 justify-center">
                  {list.map((menu, index) => {
                    return (
                      <>
                        {(() => {
                          console.log(props.category)
                          console.log(menu.category)
                          if (props.category === menu.category) {
                            const url = getGFormURL(menu.category, menu.name);
                            return (
                              <div className="flex">
                                <div
                                  className="w-full p-6 mx-auto"
                                  key={index}
                                >
                                  <div className="bg-white rounded-lg shadow-lg">
                                    <div className="">
                                      <div className="">
                                        <img
                                          className="rounded-t-lg bg-clip-padding"
                                          src={menu.imageURL}
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="w-full p-2 md:p-4">
                                      <div className="mb-1">
                                        <MenuStarRatings
                                          ratings={menu.stars ? menu.stars : 0}
                                        />
                                        <h2 className="text-gray-900 text-md md:text-md sm:text-md font-medium">
                                          {menu.name}
                                        </h2>
                                        <h2 className="text-gray-900 text-2xl md:text-xl sm:text-xl font-medium">
                                          ¥{menu.price}
                                        </h2>
                                        <h2 className="text-gray-900 text-md font-medium border rounded-lg p-2 mt-2">
                                          {menu.text}
                                        </h2>
                                      </div>
                                      <a href={menu.url}>
                                        <div className="flex">
                                          <ModalMenuInfo
                                            restaurant={props.restaurant}
                                            name={menu.name}
                                            id={menu.id}
                                            formURL={url}
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </>
                    );
                  })}
                </div>
              </div>
            </>
      </section>
    </>
  );
};
export default EachMenuCategory;
