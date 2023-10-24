import CafeAccess from "@src/components/User/CafeAccess";
import CafeInfo from "@src/components/User/CafeInfo";
import GlobalNavBar from "@src/components/User/GlobalNavBar";
import NavUnderbar from "@src/components/User/NavUnderbar";
import UserNewsList from "@src/components/User/UserNewsList";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import MenuCardDev from "@src/components/User/MenuCardDev";

import Link from "next/link";

const headstytle = "text-xl underline text-center pt-10 pb-3";
const UserHome = () => {
  return (
    <div>
      <GlobalNavBar />
      <div className="container md:w-1/2 mx-auto">
          <img className="" src="https://firebasestorage.googleapis.com/v0/b/gdsc-nu-sc2023.appspot.com/o/images%2Fdavinchhall.jpg?alt=media&token=fb6a1756-55c3-489b-afb7-a79b6f0f36c2"/>
          <Carousel>
            <></>
            <></>
          </Carousel>
        <div className="text-center">
          <a className="pt-10 pb-3 text-2xl font-bold ">お知らせ</a>
          <UserNewsList props="DaVinch_News"/>
        </div>
        <div className="text-center">
          <a className="pt-10 pb-3 text-2xl font-bold ">メニュー</a>
          <MenuCardDev restaurant="DaVinch" />
        </div>
        <div className="text-center mt-4">
          <a className=" text-2xl pt-10 font-bold">アクセス</a>
          <CafeAccess />
        </div>
      </div>
      
      <NavUnderbar />
    </div>
  );
};

export default UserHome;
