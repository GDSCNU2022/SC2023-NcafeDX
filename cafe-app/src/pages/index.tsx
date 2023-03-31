import MenuCardDev from "@/components/User/MenuCardDev";
import { Inter } from "next/font/google";
import AdminTop from "./AdminTop";
import UserHome from "./UserHome";
const inter = Inter({ subsets: ["latin"] });
import React from "react";

export default function Home() {
  return (
    <>
      {/* <AdminTop></AdminTop> */}

      <UserHome />
    </>
  );
}
// // import GlobalNavBar from "@/components/User/GlobalNavBar";
