import GlobalNavBar from '@src/components/User/GlobalNavBar';
import EachMenuCategory from '@src/components/User/MenuCards/EachMenuCategory';
import NavUnderbar from '@src/components/User/NavUnderbar';
import 'react';

const PageNoodle = () => {

  return (
    <div className="">
      <GlobalNavBar/>
      <div className='pt-10 text-center'>
        <h1 className="text-3xl">麺類メニュー</h1>
      </div>
      <EachMenuCategory
      restaurant='DaVinch'
      category='noodle'
      />
      <NavUnderbar/>
    </div>
  );
};

export default PageNoodle;