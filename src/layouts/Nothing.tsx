import React, { ReactNode } from "react";

interface NothingProps {
  children: ReactNode;
}

const Nothing: React.FC<NothingProps> = ({ children }) => {
  return (
    <div className="flex relative items-center bg-[#f6f9fc]">
      <div className="flex w-full min-h-screen">{children}</div>
    </div>
  );
};

export default Nothing;
