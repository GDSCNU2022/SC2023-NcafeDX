import UserHome from "./Home";
import React from "react";
React.useLayoutEffect = React.useEffect;

export default function Home() {
  return (
    <>
      {/* <AdminTop></AdminTop> */}

      <UserHome />
    </>
  );
}
// // import GlobalNavBar from "@/components/User/GlobalNavBar";
