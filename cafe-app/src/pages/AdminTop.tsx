import Link from "next/link";
import CreateQR from "../components/Examples/CreateQR";
import ModalStarWindow from "../components/Modal/ModalStarWindow";
import PFCRadarChart from "@/components/Examples/PFCRaderChart";
import MenuCard from "@/components/Examples/MenuCard";

const AdminTop = () => {
  return (
    <div className="flex flex-col h-80 bg-gray-300">
      <p className="text-2xl text-center pb-10">Admin Form</p>
      <div className="grid grid-cols-2">
        <Link
          href="/AdminMenuForm"
          className="py-20 m-2 text-neutral-800 hover:text-blue-500
                flex justify-center text-xl border border-gray-900 rounded"
        >
          Edit Menus
        </Link>
        <Link
          href="/AdminNewsForm"
          className="py-20 m-2 text-neutral-800 hover:text-blue-500
                flex justify-center text-xl  border border-gray-900 rounded"
        >
          Edit News
        </Link>
      </div>
    </div>
  );
};
export default AdminTop;