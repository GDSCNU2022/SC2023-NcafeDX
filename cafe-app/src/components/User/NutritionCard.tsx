import { useState, useEffect } from "react";
import { db } from "../../firebase/client";
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
    text: ""
  };
  const [menus, setMenus] = useState<MenuProps>(initMenu);

  // ignite when mounted
  useEffect(() => {
    getMenu(db, props.path).then((value: any) => {
      setMenus(value);
    });
  }, []);
  const tablestyle = "bg-white border-b bg-neutral-100 text-sm text-left";

  return (
    <div className="flex justify-between w-full">
      <div className="">
        <h2 className="text-gray-900 underline text-left pl-2 text-lg">栄養成分表</h2>
        <div id="table" className="flex flex-row">
          <div className="w-0">
            <PFCRadarChart
              data={{
                P: menus.nutrition.P,
                F: menus.nutrition.F,
                C: menus.nutrition.C,
              }}
            />
          </div>
          <table className="flex inline-block px-1 m-1 font-light">
            <tbody>
              <tr className={tablestyle}>
                <td>Cal: </td>
                <td className="text-right">&nbsp;{menus.nutrition.kcal}&nbsp;</td>
                <td>kcal</td>
              </tr>
              <tr className={tablestyle}>
                <td>P: </td>
                <td className="text-right">&nbsp;{menus.nutrition.P}&nbsp; </td>
                <td>g</td>
              </tr>
              <tr className={tablestyle}>
                <td>F: </td>
                <td className="text-right">&nbsp;{menus.nutrition.F}&nbsp; </td>
                <td>g</td>
              </tr>
              <tr className={tablestyle}>
                <td>C: </td>
                <td className="text-right">&nbsp;{menus.nutrition.C}&nbsp; </td>
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
