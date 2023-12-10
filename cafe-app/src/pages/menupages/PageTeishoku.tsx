import GlobalNavBar from '@src/components/User/GlobalNavBar';
import EachMenuCategory from '@src/components/User/MenuCards/EachMenuCategory';
import NavUnderbar from '@src/components/User/NavUnderbar';
import 'react';

const PageTeishoku = () => {

  return (
    <div className="">
      <GlobalNavBar/>
      <div className='pt-10 text-center'>
        <h1 className="text-3xl">定食メニュー</h1>
      </div>
      <EachMenuCategory
      restaurant='DaVinch'
      category='teishoku'
      />
      <NavUnderbar/>
    </div>
  );
};

export default PageTeishoku;