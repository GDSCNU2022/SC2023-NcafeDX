import Link from "next/link";

function NavUnderbar() {
  return (
    <>
      <div className="shadow fixed bottom-0 bg-white mx-auto text-center w-full">
        <nav className="grid pb-2 grid-cols-3 font-medium text-gray-900 items-center place-content-stretch">
          <div className="hover:bg-yellow-300 duration-300">
            <Link href="/">
              <div className="mt-1 inline-block">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www).w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-900">ホーム</div>
            </Link>
          </div>
          <div className="text-green-400 mr-5 hover:text-white hover:bg-yellow-300 duration-300">
            <Link href="/DaVinch">
              <div
                className="
              text-2xl "
              >
                Da
              </div>
              <div className="text-xs text-gray-900">メニュー</div>
            </Link>
          </div>
          <div className="hover:bg-yellow-300 duration-300">
            <a href="https://forms.gle/rZGWi9MzH7somHkF6" target="_blank" rel="noopner noreferrer">
              <div className="mt-1 inline-block">
                <svg
                  width="24"
                  height="24"
                  viewBox="-0.5 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6375 9.04176L13.3875 14.2418C13.3075 14.3218 13.1876 14.3718 13.0676 14.3718H10.1075V11.3118C10.1075 11.1918 10.1575 11.0818 10.2375 11.0018L15.4376 5.84176"
                    stroke="#0F0F0F"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.7076 11.9818V21.6618C18.7076 21.9018 18.5176 22.0918 18.2776 22.0918H2.84756C2.60756 22.0918 2.41754 21.9018 2.41754 21.6618V6.23176C2.41754 5.99176 2.60756 5.80176 2.84756 5.80176H12.4875"
                    stroke="#0F0F0F"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3863 2.90824L16.859 4.43558L20.0551 7.63167L21.5824 6.10433L18.3863 2.90824Z"
                    stroke="#0F0F0F"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-900">アンケート</div>
            </a>
          </div>
        </nav>
      </div>
      <div className="h-20"></div>
    </>
  );
}
export default NavUnderbar;
