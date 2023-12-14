import CafeAccess from "@src/components/User/CafeAccess";
import GlobalNavBar from "@src/components/User/GlobalNavBar";
import UserNewsList from "@src/components/User/UserNewsList";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ImageCarouselBar from "@src/components/Utils/ImageCarouselBar";
import { SwiperSlide } from "swiper/react";
import CategoryCard from "@src/components/User/CategoryCard ";
import CategorySwiper from "@src/components/User/CategorySwiper";
import { useEffect } from 'react';
import NavUnderbar from "@src/components/User/NavUnderbar";
import ChangingEveryDayMenu from "@src/components/User/MenuCards/ChangingEveryDayMenu";

const headstytle = "text-xl underline text-center pt-10 pb-3";
const UserHome = () => {
  return (
    <div className="bg-color-zinc-50">
      <GlobalNavBar />
      <ImageCarouselBar>
        <SwiperSlide>
          <div className="flex h-80 w-screen justify-center object-cover bg-gray-600 ">
            <img className="w-screen object-none object-[center_-36rem]"
            src="https://firebasestorage.googleapis.com/v0/b/gdsc-nu-sc2023.appspot.com/o/images%2Fdavinchhall.jpg?alt=media&token=fb6a1756-55c3-489b-afb7-a79b6f0f36c2"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-60 object-none">
            紹介画像？
          </div>
        </SwiperSlide>
      </ImageCarouselBar>

      <div className="mx-auto">
        <div className="text-center">
          <h1 className="pt-10 pb-3 text-2xl font-bold ">お知らせ</h1>
          <UserNewsList props="DaVinch_News"/>
        </div>
      </div>
      <div>
        <div className="text-center">
          <h1 id="main-menu-swiper" className="pt-10 pb-3 text-2xl font-bold ">メニュー</h1>
      <CategorySwiper>
        <SwiperSlide>
          <CategoryCard src="/img/teisyoku_haizen.png" link="/menupages/PageTeishoku" 
          text="定食"/>
        </SwiperSlide>
        <SwiperSlide>
          <CategoryCard src="/img/food_butadon.png" link="/menupages/PageDonburi" 
          text="丼"/>
        </SwiperSlide>
        <SwiperSlide>
          <CategoryCard src="/img/food_ra-men_none.png" link="/menupages/PageNoodle" 
          text="麺"/>
        </SwiperSlide>
        <SwiperSlide>
          <CategoryCard src="/img/food_curryrice_white.png" link="/menupages/PageCurry" 
          text="カレー"/>
        </SwiperSlide>
      </CategorySwiper>
      <ChangingEveryDayMenu restaurant="DaVinch"/>
      
          {/*<MenuCardDev restaurant="DaVinch" />*/}
        </div>
        <div className="container mx-auto text-center mt-4">
          <h2 className="text-2xl pt-10 font-bold">営業時間</h2>
          <p className="text-xl pt-2">8:00 ~ 15:00</p>
          <p className="text-xl pb-2">17:00 ~ 19:00</p>
        </div>
        <div className="container mx-auto text-center mt-4">
          <h1 className=" text-2xl pt-10 font-bold">アクセス</h1>
          <a>千葉県船橋市習志野台７−２４</a>
          <CafeAccess />
        </div>
      </div>
      
      <NavUnderbar />
  </div>
  );
};

export default UserHome;
