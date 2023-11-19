import React from "react";

const ImageSnapBar = ({children}) => {

  
  return (
    <div className="snap-x w-screen ">
      <div className="h-96 snap-center bg-zinc-50">
        {children}
      </div>

    </div>
  )
};

export default ImageSnapBar;