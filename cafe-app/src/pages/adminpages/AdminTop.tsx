import Link from "next/link";
import CreateQR from "@src/components/Examples/CreateQR";
import ModalStarWindow from "@src/components/Modal/ModalStarWindow";
import PFCRadarChart from "@src/components/Examples/PFCRaderChart";
import MenuCard from "@src/components/Examples/MenuCard";
import GlobalNavBar from "@src/components/User/GlobalNavBar";

const AdminTop = () => {
  return (
    <div className="">
      <GlobalNavBar />
      <p className="pt-10 text-2xl text-center pb-10">管理者画面</p>
      <div className="">
        <div className="w-fit p-4 mx-auto my-10 text-neutral-800 hover:text-blue-500 flex justify-center 
        text-xl border border-gray-900 rounded hover:bg-sky-100">
        <Link href="./AdminMenuForm">
          メニュー編集フォーム
        </Link>
        </div>
        <div className="w-fit p-4 mx-auto text-neutral-800 hover:text-blue-500
        flex justify-center text-xl  border border-gray-900 rounded hover:bg-sky-100">
        <Link href="./AdminNewsForm">
          お知らせ編集フォーム
        </Link>
        </div>
      </div>
    </div>
  );
};
export default AdminTop;