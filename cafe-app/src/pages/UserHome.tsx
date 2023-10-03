import CafeAccess from "@src/components/User/CafeAccess";
import CafeInfo from "@src/components/User/CafeInfo";
import GlobalNavBar from "@src/components/User/GlobalNavBar";
import NavUnderbar from "@src/components/User/NavUnderbar";
import UserNewsList from "@src/components/User/UserNewsList";
import Link from "next/link";

const headstytle = "text-xl underline text-center pt-10 pb-3";
const UserHome = () => {
  return (
    <>
      <GlobalNavBar />
      <div className="container md:w-1/2 mx-auto">
        <div className="mt-10 border border-gray-300 shadow-lg rounded-2xl">
          <h1 className="text-xl underline text-center pb-1" id="news">
            News
          </h1>
          <UserNewsList props="DaVinch_News" />
        </div>
        <h1 className={headstytle} id="infomation">
          Information
        </h1>
        <CafeInfo />
        <h1 className={headstytle} id="access">
          Access
        </h1>
        <CafeAccess />
      </div>
      
      <NavUnderbar />
    </>
  );
};

export default UserHome;
