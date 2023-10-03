import Link from "next/link";
import CreateQR from "@src/components/Examples/CreateQR";
import ModalStarWindow from "@src/components/Modal/ModalStarWindow";
import PFCRadarChart from "@src/components/Examples/PFCRaderChart";
import MenuCard from "@src/components/Examples/MenuCard";

const AdminTop = () => {
  return (
    <div className="flex flex-col h-80 bg-gray-300">
      <p className="text-2xl text-center pb-10">Admin Form</p>
      <div className="grid grid-cols-2">
        <div className="py-20 m-2 text-neutral-800 hover:text-blue-500 flex justify-center 
        text-xl border border-gray-900 rounded">
        <Link href="/AdminMenuForm">
          Edit Menus
        </Link>
        </div>
        <div className="py-20 m-2 text-neutral-800 hover:text-blue-500
        flex justify-center text-xl  border border-gray-900 rounded">
        <Link href="/AdminNewsForm">
          Edit News
        </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminTop;