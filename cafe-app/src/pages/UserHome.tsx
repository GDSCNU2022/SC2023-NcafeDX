import CafeAccess from "@/components/User/CafeAccess";
import CafeInfo from "@/components/User/CafeInfo";
import GlobalNavBar from "@/components/User/GlobalNavBar";
import NavUnderbar from "@/components/User/NavUnderbar";
import UserNewsList from "@/components/User/UserNewsList";
import Link from "next/link";

const headstytle = "text-xl underline text-center pt-10 pb-3";
const UserHome = () => {
  return (
    <>
      <GlobalNavBar />
      <div className="container md:w-1/2 mx-auto">
        <div className="mt-10 border border-gray-300 shadow-lg rounded-2xl">
          <h1 className="text-xl underline text-center pb-1" id="news">
            食堂からのお知らせ
          </h1>
          <UserNewsList props="DaVinch_News" />
        </div>
        <h1 className={headstytle} id="infomation">
          食堂情報
        </h1>
        <CafeInfo />
        <h1 className={headstytle} id="access">
          アクセス
        </h1>
        <CafeAccess />
      </div>
      <NavUnderbar />
    </>
  );
};

export default UserHome;
