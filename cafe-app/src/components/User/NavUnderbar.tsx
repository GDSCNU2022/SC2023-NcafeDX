import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import HomeIcon from '@mui/icons-material/Home';

function NavUnderbar() {
  return (
    <>
      <div className="shadow fixed bottom-0 bg-white mx-auto text-center w-full z-50">
        <nav className="grid pb-2 grid-cols-4 font-medium text-gray-900 place-items-center">
          <div className="w-fit hover:bg-yellow-300 duration-300 hover:cursor-pointer">
            <Link href="/">
              <HomeIcon/>
            </Link>
            <div className="text-xs text-gray-900">ホーム</div>
          </div>
          <div className="w-fit text-green-400 mr-5 hover:text-white hover:bg-yellow-300 duration-300
          hover:cursor-pointer">
            <Link href="/Home/#main-menu-swiper">
              <div
                className="
              text-2xl "
              >
                Da
              </div>
            </Link>
            <div className="text-xs text-gray-900">メニュー</div>
          </div>
          <div className="hover:bg-yellow-300 duration-300 w-fit hover:text-white hover:bg-yellow-300 duration-300
          hover:cursor-pointer">
            <a href="https://forms.gle/rZGWi9MzH7somHkF6" target="_blank" rel="noopner noreferrer">
              <DynamicFormIcon/>
              <div className="text-xs text-gray-900">アンケート</div>
            </a>
          </div>
          <div className="w-fit hover:text-white hover:bg-yellow-300 duration-300
          hover:cursor-pointer">
            <Link href="/signin">
              <AccountCircleIcon/>
            </Link>
            <div className="text-xs text-gray-900 w-fit">ログイン</div>
          </div>
        </nav>
      </div>
      <div className="h-20"></div>
    </>
  );
}
export default NavUnderbar;
