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
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.shrimp ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.crab ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.walnut ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.wheat ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.soba ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.egg ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.dairy ? '○' : '-'}</a>
            </td>
            <td scope="col" className="px=4 py-2 border text-center">
              <a>{allergicBool.peanut ? '○' : '-'}</a>
            </td>
        </tbody>
      </table>
    </>
  )
};

export default AllergicTable;