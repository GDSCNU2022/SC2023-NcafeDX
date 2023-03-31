import { useState, useEffect } from "react";
import { db } from "../../../firebase/client";
import { getMenu, MenuProps, Nutrition } from "../../pages/api/get-menu";
import PFCRadarChart from "../Examples/PFCRaderChart";
import ModalStarWindow from "../Modal/ModalStarWindow";
import MenuStarRatings from "../Examples/MenuStarRatings";

// Data Structure
// Collection{DaVinch}/Doc{Menu}/Collection{Teishoku, Noodle, Don}/Doc{MenuName}/Field{MenuProps}
// Users/
type Props = {
  path: string;
};

const NutritionCard = (props: Props) => {
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
  const tablestyle = "bg-white border-b bg-neutral-100 text-xs text-left";

  return (
    <div className="flex justify-between w-full">
      <div className="">
        <h2 className="text-gray-900 underline text-left pl-2">栄養素情報</h2>
        <div id="table" className="flex flex-row">
          <div className="w-0 pl-0">
            <PFCRadarChart
              data={{
                P: menus.nutrition.P,
                F: menus.nutrition.F,
                C: menus.nutrition.C,
              }}
            />
          </div>
          <table className="inline-block px-1 m-1 font-light">
            <tbody>
              <tr className={tablestyle}>
                <td>エネルギー</td>
                <td>{menus.nutrition.kcal} </td>
                <td>kcal</td>
              </tr>
              <tr className={tablestyle}>
                <td>タンパク質</td>
                <td>{menus.nutrition.P} </td>
                <td>g</td>
              </tr>
              <tr className={tablestyle}>
                <td>脂質</td>
                <td>{menus.nutrition.F} </td>
                <td>g</td>
              </tr>
              <tr className={tablestyle}>
                <td>炭水化物</td>
                <td>{menus.nutrition.C} </td>
                <td>g</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;
