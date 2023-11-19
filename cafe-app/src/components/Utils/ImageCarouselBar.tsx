import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwipeCore, { Pagination, Navigation, Mousewheel }  from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageCarouselBar = ({children}) => {

  return (
    <div className="w-screen">
      <div className="bg-zinc-50">
        <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        centeredSlides
        slidesPerView={1}
        spaceBetween={1}
        pagination={{clickable: true}}
        navigation
        >
          {children}
        </Swiper>
      </div>
    </div>
  )
};

export default ImageCarouselBar;