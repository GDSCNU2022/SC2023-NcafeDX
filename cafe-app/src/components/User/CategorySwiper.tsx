import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeCore, { Pagination, Navigation, Mousewheel }  from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategorySwiper = ({children}) => {

  return (
    <div className="w-screen px-10">
      <div className="bg-zinc-50">
        <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        slidesPerView={4}
        spaceBetween={30}
        >
          {children}
        </Swiper>
      </div>
    </div>
  )
};

export default CategorySwiper;