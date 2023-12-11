import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeCore, { Pagination, Navigation, Mousewheel }  from 'swiper/modules';
import { useWindowSize } from "../Utils/useWindowSize";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategorySwiper = ({children}) => {
  const [width, height]= useWindowSize();

  return (
    <div className="w-screen px-10">
      <div className="">
        <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        slidesPerView={width/height < 0.65 ? 1 
          : width/height < 1.2 ? 2 
          : 4}
        spaceBetween={30}
        mousewheel={true}
        scrollbar={true}
        autoplay={true}
        pagination={{clickable: true}}
        centeredSlides
        >
          {children}
        </Swiper>
      </div>
    </div>
  )
};

export default CategorySwiper;