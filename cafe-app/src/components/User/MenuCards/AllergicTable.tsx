import { useState, useEffect } from "react";
import { db } from "@src/firebase/client";
import {
  Allergens,
  categories,
  getAllMenus,
  RestaurantType,
} from "@src/pages/api/get-menu";
import MenuStarRatings from "@src/components/Examples/MenuStarRatings";
import ModalMenuInfo from "@src/components/Modal/ModalMenuInfo";
import ReactStarRatings from "@src/components/Examples/ReactStarRatings";

type Props = {
  value: Allergens
}
const AllergicTable = (props: Props) => {

  const allergicBool = props.value;

  return (
    <>
      <table className="">
        <thead>
          <tr>
            {['えび','かに','くるみ', '小麦', 'そば', '卵', '乳', '落花生'].map((inp: string) => (
              <th scope="col" className="text-sm px-1 border">{inp}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(allergicBool).map((value: boolean, i: number) => (
              <td scope="col" className="px=4 py-2 border text-center">
                <a>{value ? '○': '-'}</a>
              </td>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default AllergicTable;