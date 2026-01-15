import React from "react";

const Background = () => {
  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        <div className="absolute top-[5%] w-full py-9 bg- flex justify-center text-xl font-medium text-gray-500">
          Documents
        </div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[13vw] font-semibold text-gray-500 leading-none tracking-normal">
          Docs.
        </h1>
      </div>
    </>
  );
};

export default Background;
