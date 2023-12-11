import React, { useState, useEffect } from 'react';
import { db } from '@src/firebase/client';
import { getAllMenus } from '@src/pages/api/get-menu';
import { getGFormURLWithInitValue } from '@src/pages/api/getGFormUrl';
import MenuCard from './MenuCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, EffectCards, EffectCreative, EffectFlip }  from 'swiper/modules';
import { useWindowSize } from "@src/components/Utils/useWindowSize";

const ChangingEveryDayMenu = React.memo((props: {restaurant: string}) => {
  const [list, setList] = useState<Array<any>>([]);
  const [today, setToday] = useState<string>();
  const [width, height]= useWindowSize();
  const dayOfWeekItem = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
  const date = new Date();
  const week = date.getDay();

  const updateList = (doc: any) => {
    const docData = doc.data();
    const newObj = {
      ...docData,
      id: doc.id,
    };
    setList((list) => {
      return [...list, newObj];
    });
  };
  // ignite when mounted
  useEffect(() => {
    // strictModeのせいでマウント時に2回レンダリングされる
    getAllMenus(db, updateList, props.restaurant);
    setToday(() => dayOfWeekItem[week]);
    
    return () => {
      console.log("unmounting...");
      setList((list) => []);
    };
  }, []);

  const getGFormURL = (category: "teishoku" | "noodle" | "don" | "curry", menuName: string) => {
    const convetedCategory = category === "teishoku" ? "定食" 
    : category === "noodle" ? "麺類"
    : category === "don" ? "丼"
    : category === "curry" ? "カレー"
    : undefined
    const _formURL = category 
                      &&
                      menuName ? getGFormURLWithInitValue(convetedCategory, menuName) 
                      : 
                      "https://docs.google.com/forms/d/e/1FAIpQLScDyGluCCHPhD6ij4gqdUmfixnstnD1DJzFtz0Y4Zsda1533g/viewform";
    
    return _formURL;
  };
  
  return (
    <>
        <section className="text-gray-900 p-10">
            <h1 className="text-2xl font-bold m-4 mt-20">今日の日替わりメニュー</h1>
              <div className="mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination, Mousewheel, EffectCards, EffectCreative, EffectFlip]}
                    pagination={{clickable: true}}
                    spaceBetween={10}
                    effect={width/height < 0.65 ? "cards" : null}
                    slidesPerView={width/height < 0.65 ? 1 
                      : width/height < 1.2 ? 2
                      : 3}
                    centeredSlides
                    >
                  {list.map((menu, index) => {
                    const url = getGFormURL(menu.category, menu.name);
                    if(menu && menu.dayOfWeek && menu.dayOfWeek[today] && !menu.dayOfWeek["everyDay"]){
                      return (
                        <SwiperSlide>
                          <MenuCard domID="CED-menu-card" menu={menu} index={index} restaurant={props.restaurant} formUrl={url}/>
                        </SwiperSlide>
                      );
                    }
                  })}
                  </Swiper>
                  {() => {
                  if (typeof document !== undefined) {
                    if (document?.getElementById("CED-menu-card") == null){
                      return <p id="no-CED-menus" className=''>今日の日替わりメニューはありません．</p>
                    }}  
                  return  <></>
                  }
                  }
              </div>
      </section>
    </>
  );

}
);

export default ChangingEveryDayMenu;