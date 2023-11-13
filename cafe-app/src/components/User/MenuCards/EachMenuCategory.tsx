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
                <div className="flex flex-wrap justify-center">
                  {list.map((menu, index) => {
                    return (
                      <>
                        {(() => {
                          console.log(props.category)
                          console.log(menu.category)
                          if (props.category === menu.category) {
                            return (
                              <>
                                <div
                                  className="aspect-[1/1] w-1/2 md:w-1/2 p-6 mx-auto"
                                  key={index}
                                >
                                  <div className="object-left-top bg-white rounded-lg shadow-lg ">
                                    <div className="aspect-[8/5]">
                                      <div
                                        className={`w-full ${stylecolor} rounded-t-lg h-1/5 `}
                                      ></div>
                                      <div
                                        className={`w-full ${stylecolor} rounded-b-full h-4/5`}
                                      ></div>
                                    </div>
                                    <div className="relative">
                                      <div className="absolute w-10/12 top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
                                        <img
                                          className="rounded-lg bg-clip-padding"
                                          src={menu.imageURL}
                                        />{" "}
                                      </div>
                                    </div>
                                    <div className="relative p-2 md:p-4">
                                      <div className="flex-col items-center pt-10 md:pt-20 mb-1">
                                        <MenuStarRatings
                                          ratings={menu.stars ? menu.stars : 0}
                                        />
                                        <h2 className="text-gray-900 text-md font-medium">
                                          {menu.name}
                                        </h2>
                                        <h2 className="text-gray-900 text-3xl font-medium">
                                          ¥{menu.price}
                                        </h2>
                                      </div>
                                      <a href={menu.url}>
                                        <div className="absolute bottom-5 right-5 w-1/4 mx-auto">
                                          <ModalMenuInfo
                                            restaurant={props.restaurant}
                                            name={menu.name}
                                            id={menu.id}
                                          />
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </>
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
