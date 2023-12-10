import React, { useState, useEffect } from "react";
import { auth, provider } from "@src/firebase/client";
import { signInWithPopup, signOut } from "@firebase/auth";
import Link from "next/link";
import AdminTop from "@src/pages/adminpages/AdminTop";
import router from 'next/router'

const admin = JSON.parse(process.env.NEXT_PUBLIC_ACCOUNT_KEY as string) 

const allowedEmails = [admin.email];


function GlobalNavBar() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
        setIsAdmin(() => false);
      } else {
        setUser(undefined);
        setIsAdmin(() => false);
        setMessage("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider);
  };

    const clickLogout = async () => {
      console.log(user);

    signOut(auth).then(() => {
      console.log("ログアウトしました")
      router.push('/')
    })
    .catch((err) => {
      console.log(`エラーが発生しました (${err})`)
    })
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 shadow-lg">
        <button className="pl-5 text-xl font-bold italic" onClick={()=>{router.push('/')}}>
            DA VINCI HALL
        </button>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <button>
              <div
                className="HAMBURGER-ICON space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)}
              >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              </div>
            </button>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <button>
                <div
                  className="absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </button>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  {
                    user ?
                    <button onClick={()=>clickLogout()}>
                    ログアウト
                    </button>
                    :
                    <button onClick={()=>{router.push('/signin')}}>
                    ログイン
                    </button>
                    
                  }
                </li>
                <li className="border-b border-gray-400 my-8">
                  <a href="https://forms.gle/rZGWi9MzH7somHkF6">アンケート</a>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex ">
            <li className="flex text top-0 justify-center ">
              {
                user ?
                <button onClick={()=>clickLogout()}>
                ログアウト
                </button>
                :
                <button onClick={()=>{router.push('/signin')}}>
                ログイン
                </button>
              }
            </li>
            <li className="flex text top-0 justify-center">
              {
              isAdmin ?
              <button onClick={() => router.push('/adminpages/AdminTop')}>
                管理者編集ページ
              </button>
              : <></>
            }
            </li>
            <li className="border-b border-gray-400">
              <a href="https://forms.gle/rZGWi9MzH7somHkF6">アンケート</a>
              </li>
          </ul>
        </nav>
        <style>{`
        .hideMenuNav {
          display: none;
        }
        .showMenuNav {
          display: block;
          position: absolute;
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
          background: white;
          z-index: 10;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
      </div>
    </>
  );
}

export default GlobalNavBar;
