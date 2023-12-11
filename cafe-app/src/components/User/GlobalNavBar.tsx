import React, { useState, useEffect } from "react";
import { auth, provider } from "@src/firebase/client";
import { signInWithPopup, signOut } from "@firebase/auth";
import Link from "next/link";
import AdminTop from "@src/pages/adminpages/AdminTop";
import router from 'next/router'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
        
        user.getIdTokenResult(true).then((idTokenResult) => {
        if(idTokenResult.claims.admin) {
          setIsAdmin(() => true);
        } else {
          setIsAdmin(() => false);
        }
      });
      } else {
        setUser(undefined);
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
      setIsAdmin(() => false);
      setUser(() => undefined);
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
                <MenuIcon/>
              </div>
            </button>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <button>
                <div
                  className="absolute top-0 right-0 px-8 py-8"
                  onClick={() => setIsNavOpen(false)}
                >
                  <CloseIcon/>
                </div>
              </button>
              <ul className="flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 uppercase">
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
                <li className="border-b border-gray-400 uppercase">
                  {
                    isAdmin ?
                    <button onClick={() => router.push('/adminpages/AdminTop')}>管理ページ</button>
                    : <></>
                  }
                </li>
                <li className="border-b border-gray-400">
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
            <li className="border-b border-gray-400 uppercase">
              {
                isAdmin ?
                <button onClick={() => router.push('/adminpages/AdminTop')}>管理ページ</button>
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
