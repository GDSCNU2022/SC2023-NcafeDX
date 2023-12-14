import React, { useState, useEffect } from "react";
import { db } from "@src/firebase/client";
import {
  categories,
  getAllMenus,
  RestaurantType,
} from "@src/pages/api/get-menu";
import MenuStarRatings from "@src/components/Examples/MenuStarRatings";
import ModalMenuInfo from "@src/components/Modal/ModalMenuInfo";
import { getGFormURLWithInitValue } from "@src/pages/api/getGFormUrl";
import MenuCard from "./MenuCard";
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

const EachMenuCategory = React.memo((props: Props) => {
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

  const getGFormURL = (category: "teishoku" | "noodle" | "don" | "curry", menuName: string) => {
    const convetedCategory = category === "teishoku" ? "定食" 
    : category === "noodle" ? "麺類"
    : category === "don" ? "丼"
    : category === "curry" ? "カレー"
    : undefined
    const _formURL = category 
                      &&
                      menuName ? getGFormURLWithInitValue(convetedCategory, menuName) 
                      : 
                      "https://docs.google.com/forms/d/e/1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g/viewform";
    
    return _formURL;
  };

  // ignite when mounted
  useEffect(() => {
    // strictModeのせいでマウント時に2回レンダリングされる
    getAllMenus(db, updateList, props.restaurant);
    return () => {
      setList((list) => []);
    };
  }, []);
  const stylecolor = cafecolor(props.restaurant);
  return (
    <>
      <section className="text-gray-900 border-t border-gray-200">
            <>
              <div id="" className="">
                <div className="grid sm:grid-cols-2 grid-cols-1">
                  {list.map((menu, index) => {
                    return (
                      <>
                        {(() => {
                          if (props.category === menu.category) {
                            const url = getGFormURL(menu.category, menu.name);
                            return (
                              <div className="my-2">
                                <MenuCard domID="menu-card-category" menu={menu} index={index} restaurant={props.restaurant} formUrl={url}/>
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
}
);
export default EachMenuCategory;
