import { useState, useEffect } from "react";
import { db } from "../../../firebase/client";
import { getMenu, MenuProps, Nutrition } from "../../pages/api/get-menu";
import PFCRadarChart from "./PFCRaderChart";
import ModalStarWindow from "../Modal/ModalStarWindow";
import MenuStarRatings from "./MenuStarRatings";

// Data Structure
// Collection{DaVinch}/Doc{Menu}/Collection{Teishoku, Noodle, Don}/Doc{MenuName}/Field{MenuProps}
// Users/
type Props = {
  path: string;
};

const MenuCard = (props: Props) => {
  const initMenu = {
    name: "",
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
  const [menus, setMenus] = useState<MenuProps>(initMenu);

  // ignite when mounted
  useEffect(() => {
    getMenu(db, props.path).then((value: any) => {
      setMenus(value);
    });
  }, []);

  return (
    <div className="bg-gray-400 shadow-sm rounded-md w-96 h-64">
      <div>
        <p className="text-gray-700 text-lg text-center font-bold">
          {menus.name}
        </p>
      </div>
      <div className="flex justify-between p-2">
        <div className="">
          {menus?.imageURL ? (
            <img src={menus?.imageURL} width={164} />
          ) : (
            <p>No Image</p>
          )}

          <MenuStarRatings ratings={menus.stars ? menus.stars : 0} />
          <ModalStarWindow restaurant="DaVinch" menuName={menus.name} />
        </div>

        <div className="">
          <PFCRadarChart
            data={{
              P: menus.nutrition.P,
              F: menus.nutrition.F,
              C: menus.nutrition.C,
            }}
          />
          <div id="table" className="flex justify-end pt-2">
            <table className="px-2 m-1 font-light">
              <thead className="border-b bg-neutral-200 font-medium">
                <tr>
                  {["kcal", "P", "F", "C"].map((inp: any) => (
                    <th scope="col" className="w-6 px-2 py-1 text-center">
                      {inp}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-neutral-100 text-sm text-center">
                  <td scope="col">{menus.nutrition.kcal}</td>
                  <td scope="col">{menus.nutrition.P}</td>
                  <td scope="col">{menus.nutrition.F}</td>
                  <td scope="col">{menus.nutrition.C}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
