import React, { useState, useEffect } from "react";
import { auth, provider } from "../../../firebase/client";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import AdminTop from "@/pages/AdminTop";

const admin = JSON.parse(process.env.NEXT_PUBLIC_ADMIN as string) 

const allowedEmails = [admin.email];


function GlobalNavBar() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user && user.email 
        // Everyone can login as an admin for Solution Challenge 2023
        /* &&  allowedEmails.includes(user.email) */
        ) {
        setUser(user);
        setMessage("認証しました");
        setIsAdmin(() => true);
      } else if (user && user.email 
        /* && !allowedEmails.includes(user.email) */
        ) {
        setUser(undefined);
        setMessage("認証できません");
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

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-400 p-4 shadow-lg">
        <button>
          <Link className="pl-5 text-xl font-bold italic" href="/">
            N cafe
          </Link>
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
                  <Link href="/#news" onClick={() => setIsNavOpen(false)}>
                    お知らせ
                  </Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/#infomation" onClick={() => setIsNavOpen(false)}>
                    食堂情報
                  </Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <Link href="/#access" onClick={() => setIsNavOpen(false)}>
                    アクセス
                  </Link>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <a href="https://forms.gle/rZGWi9MzH7somHkF6">アンケート</a>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <button
                    onClick={() => {
                      setIsNavOpen(false);
                      signIn();
                    }}
                  >
                    Admin Login
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex ">
            <li>
              <Link href="/#news">News</Link>
            </li>
            <li>
              <Link href="/#infomation">Restaurant Info</Link>
            </li>
            <li className="flex text-xs top-0 justify-center ">
              <button
                onClick={() => {
                  setIsNavOpen(false);
                  signIn();
                }}
              >
                Admin Login
              </button>
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
      {user ? (
        <div className="">
          <AdminTop />
          <button
            className="flex -mt-10 mx-auto text-2xl text-center pb-10  hover:text-blue-500"
            onClick={() => {
              auth.signOut();
            }}
          >
            Log out
          </button>
        </div>
      ) : null}
    </>
  );
  // return (
  //   <div>
  //
  //   </div>
  // );
}

export default GlobalNavBar;
